const fs = require('fs');
let html = fs.readFileSync('chemistry-quiz.html', 'utf-8');

// ================================================================
// 1. 修改渲染函数：多小题显示多个输入框
// ================================================================
html = html.replace(
  `    } else {
        const val = ans || '';
        const cls = ['fill-input'];
        if (state.correct[idx] === true) cls.push('correct');
        else if (state.correct[idx] === false) cls.push('wrong');
        html += \`<input class="\${cls.join(' ')}" type="text" id="fillInput" value="\${val}" placeholder="请输入答案..." oninput="fillInputChanged(this.value)">\`;
    }`,
  `    } else if (q.parts) {
        const ansArr = Array.isArray(ans) ? ans : [];
        q.parts.forEach((part, pi) => {
            const partVal = ansArr[pi] || '';
            const done = q._partCorrect && q._partCorrect[pi];
            const pCls = ['fill-input'];
            if (done === true) pCls.push('correct');
            else if (done === false) pCls.push('wrong');
            html += \`<div style="margin-bottom:10px;">
                <div style="font-size:14px;margin-bottom:4px;color:#555;">\${part.question}</div>
                <input class="\${pCls.join(' ')}" type="text" id="fillInput_\${pi}" value="\${partVal}" placeholder="请输入答案..." oninput="partInputChanged(\${pi}, this.value)">
                \${done !== undefined ? '<span style="font-size:12px;margin-left:8px;' + (done ? 'color:#27ae60;">✓' : 'color:#e74c3c;">✗ 正确: ' + part.answer[0] + '</span>') : ''}
            </div>\`;
        });
    } else {
        const val = ans || '';
        const cls = ['fill-input'];
        if (state.correct[idx] === true) cls.push('correct');
        else if (state.correct[idx] === false) cls.push('wrong');
        html += \`<input class="\${cls.join(' ')}" type="text" id="fillInput" value="\${val}" placeholder="请输入答案..." oninput="fillInputChanged(this.value)">\`;
    }`
);

// ================================================================
// 2. 添加 partInputChanged 函数
// ================================================================
html = html.replace(
  `function fillInputChanged(val) {
    const idx = state.current;
    state.answers[idx] = val || null;
}`,
  `function fillInputChanged(val) {
    const idx = state.current;
    state.answers[idx] = val || null;
}

function partInputChanged(pi, val) {
    const idx = state.current;
    if (!Array.isArray(state.answers[idx])) {
        state.answers[idx] = [];
    }
    state.answers[idx][pi] = val || '';
}`
);

// ================================================================
// 3. 修改 confirmAnswer：支持多小题判分 + 空检查
// ================================================================
html = html.replace(
  `    if (ans === null || ans === undefined || ans === '') {
        // 没作答时，选择题默认选第一个
        if (q.type === 'choice') {
            state.answers[idx] = 0;
        } else {
            alert('请先填写答案再确认！');
            return;
        }
    }`,
  `    if (q.parts) {
        const ansArr = Array.isArray(ans) ? ans : [];
        let allFilled = true;
        q.parts.forEach((part, pi) => {
            if (!ansArr[pi] || !String(ansArr[pi]).trim()) allFilled = false;
        });
        if (!allFilled) {
            alert('请先填写所有空的答案再确认！');
            return;
        }
    } else if (ans === null || ans === undefined || ans === '') {
        // 没作答时，选择题默认选第一个
        if (q.type === 'choice') {
            state.answers[idx] = 0;
        } else {
            alert('请先填写答案再确认！');
            return;
        }
    }`
);

// ================================================================
// 4. 修改 confirmAnswer 的判分部分：支持 parts
// ================================================================
html = html.replace(
  `    if (q.type === 'choice') {
        state.correct[idx] = (finalAns === q.answer);
    } else {
        // 填空题：模糊匹配
        const userAns = String(finalAns || '').trim().replace(/\s+/g, '');
        const answers = q.answer.map(a => String(a).trim().replace(/\s+/g, ''));
        const acceptable = (q.acceptable || []).map(a => String(a).trim().replace(/\s+/g, ''));
        const all = [...answers, ...acceptable];
        state.correct[idx] = all.some(a => a.toLowerCase() === userAns.toLowerCase());
    }`,
  `    if (q.type === 'choice') {
        state.correct[idx] = (finalAns === q.answer);
    } else if (q.parts) {
        const ansArr = Array.isArray(finalAns) ? finalAns : [];
        let allCorrect = true;
        q._partCorrect = [];
        q.parts.forEach((part, pi) => {
            const userAns = String(ansArr[pi] || '').trim().replace(/\s+/g, '');
            if (!userAns) { q._partCorrect[pi] = false; allCorrect = false; return; }
            const answers = part.answer.map(a => String(a).trim().replace(/\s+/g, ''));
            const acceptable = (part.acceptable || []).map(a => String(a).trim().replace(/\s+/g, ''));
            const all = [...answers, ...acceptable];
            const ok = all.some(a => a.toLowerCase() === userAns.toLowerCase());
            q._partCorrect[pi] = ok;
            if (!ok) allCorrect = false;
        });
        state.correct[idx] = allCorrect;
    } else {
        // 填空题：模糊匹配
        const userAns = String(finalAns || '').trim().replace(/\s+/g, '');
        const answers = q.answer.map(a => String(a).trim().replace(/\s+/g, ''));
        const acceptable = (q.acceptable || []).map(a => String(a).trim().replace(/\s+/g, ''));
        const all = [...answers, ...acceptable];
        state.correct[idx] = all.some(a => a.toLowerCase() === userAns.toLowerCase());
    }`
);

// ================================================================
// 5. 修改 finishQuiz 中的判分：支持 parts
// ================================================================
html = html.replace(
  `            } else {
                if (ans && String(ans).trim()) {
                    const userAns = String(ans).trim().replace(/\s+/g, '');
                    const answers = q.answer.map(a => String(a).trim().replace(/\s+/g, ''));
                    const acceptable = (q.acceptable || []).map(a => String(a).trim().replace(/\s+/g, ''));
                    const all = [...answers, ...acceptable];
                    state.correct[i] = all.some(a => a.toLowerCase() === userAns.toLowerCase());
                    if (!state.correct[i]) {
                        const wrong = getWrongIds();
                        wrong.add(q.id);
                        saveWrongIds(wrong);
                    }
                } else {
                    state.correct[i] = false;
                    // 未作答不算错题（不加入错题本）
                }
            }`,
  `            } else if (q.parts) {
                if (ans && Array.isArray(ans)) {
                    let allCorrect = true;
                    q._partCorrect = [];
                    q.parts.forEach((part, pi) => {
                        const userAns = String(ans[pi] || '').trim().replace(/\s+/g, '');
                        if (!userAns) { q._partCorrect[pi] = false; allCorrect = false; return; }
                        const answers = part.answer.map(a => String(a).trim().replace(/\s+/g, ''));
                        const acceptable = (part.acceptable || []).map(a => String(a).trim().replace(/\s+/g, ''));
                        const all = [...answers, ...acceptable];
                        const ok = all.some(a => a.toLowerCase() === userAns.toLowerCase());
                        q._partCorrect[pi] = ok;
                        if (!ok) allCorrect = false;
                    });
                    state.correct[i] = allCorrect;
                    if (!allCorrect) {
                        const wrong = getWrongIds();
                        wrong.add(q.id);
                        saveWrongIds(wrong);
                    }
                } else {
                    state.correct[i] = false;
                }
            } else {
                if (ans && String(ans).trim()) {
                    const userAns = String(ans).trim().replace(/\s+/g, '');
                    const answers = q.answer.map(a => String(a).trim().replace(/\s+/g, ''));
                    const acceptable = (q.acceptable || []).map(a => String(a).trim().replace(/\s+/g, ''));
                    const all = [...answers, ...acceptable];
                    state.correct[i] = all.some(a => a.toLowerCase() === userAns.toLowerCase());
                    if (!state.correct[i]) {
                        const wrong = getWrongIds();
                        wrong.add(q.id);
                        saveWrongIds(wrong);
                    }
                } else {
                    state.correct[i] = false;
                }
            }`
);

// ================================================================
// 6. 修改 showReviewResult：支持 parts 多小题显示
// ================================================================
html = html.replace(
  `            } else {
                html += \`<div style="font-size:14px;margin-bottom:8px;">
                    <span>你的答案：<span style="color:\${color};font-weight:600;">\${ans || '（未作答）'}</span></span>
                    <span style="margin-left:16px;">正确答案：<span style="color:var(--success);font-weight:600;">\${q.answer.join('、')}</span></span>
                </div>\`;
            }`,
  `            } else if (q.parts) {
                const ansArr = Array.isArray(ans) ? ans : [];
                html += \`<div style="font-size:14px;margin-bottom:8px;">\`;
                q.parts.forEach((part, pi) => {
                    const partAns = ansArr[pi] || '';
                    const ok = q._partCorrect && q._partCorrect[pi];
                    const icon = ok ? '✓' : '✗';
                    const c = ok ? '#27ae60' : '#e74c3c';
                    html += \`<div style="margin-bottom:8px;padding:8px;background:#f8f9fa;border-radius:8px;">
                        <div style="margin-bottom:4px;font-size:13px;">\${part.question}</div>
                        <span style="color:\${c};">\${icon} 你的答案：\${partAns || '（未作答）'}</span>
                        <span style="margin-left:12px;color:var(--success);">✓ 正确答案：\${part.answer[0]}</span>
                    </div>\`;
                });
                html += \`</div>\`;
            } else {
                html += \`<div style="font-size:14px;margin-bottom:8px;">
                    <span>你的答案：<span style="color:\${color};font-weight:600;">\${ans || '（未作答）'}</span></span>
                    <span style="margin-left:16px;">正确答案：<span style="color:var(--success);font-weight:600;">\${q.answer.join('、')}</span></span>
                </div>\`;
            }`
);

fs.writeFileSync('chemistry-quiz.html', html, 'utf-8');
console.log('Engine modifications applied successfully!');

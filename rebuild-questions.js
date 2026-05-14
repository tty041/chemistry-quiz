const fs = require('fs');

// ================================================================
// 2008 年河南中考化学真题 —— 完整大题结构
// ================================================================

const questions = [
  // ========== 选择题（1-12），保持独立 ==========
  {
    id: 'hn2008_01', type: 'choice', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '下列物质的用途主要是由其化学性质决定的是',
    options: ['A. 用干冰作制冷剂', 'B. 用金刚石切割玻璃', 'C. 用煤作燃料', 'D. 发烧病人用酒精擦身体降温'],
    answer: 2,
    explanation: '用煤作燃料是利用煤的可燃性，属于化学性质。干冰制冷、金刚石切割、酒精降温都是利用物理性质。'
  },
  {
    id: 'hn2008_02', type: 'choice', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '2008年6月1日，我国正式实行"限塑令"，开始在全国范围内限制使用塑料购物袋。下列说法不正确的是',
    options: ['A. "限塑令"有助于控制白色污染', 'B. 提倡生产和使用可降解的塑料', 'C. 塑料属于有机合成材料', 'D. 应禁止使用塑料制品'],
    answer: 3,
    explanation: '塑料制品在生活中有广泛应用，应合理使用而非禁止。其他三项说法均正确。'
  },
  {
    id: 'hn2008_03', type: 'choice', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '下列关于燃烧现象的描述，正确的是',
    options: ['A. 氢气在氧气中燃烧产生大量的白烟', 'B. 红磷在空气中燃烧发出蓝紫色火焰', 'C. 镁条在空气中燃烧发出耀眼的白光', 'D. 铁丝在空气中剧烈燃烧，火星四射'],
    answer: 2,
    explanation: '镁条在空气中燃烧发出耀眼的白光，生成白色固体。A氢气燃烧产生淡蓝色火焰；B红磷燃烧产生大量白烟而非蓝紫色火焰；D铁丝在空气中不能燃烧，在氧气中才能剧烈燃烧火星四射。'
  },
  {
    id: 'hn2008_04', type: 'choice', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '生产和生活中下列做法不正确的是',
    options: ['A. 用洗洁精或纯碱洗涤餐具上的油污', 'B. 用甲醛水溶液浸泡水产品以防止腐烂', 'C. 使用无铅汽油以减少含铅物质的排放', 'D. 开发利用新能源以减缓能源危机'],
    answer: 1,
    explanation: '甲醛有毒，不能用于浸泡水产品。A洗涤剂有乳化作用、纯碱显碱性可去油污；C无铅汽油减少铅污染；D开发新能源正确。'
  },
  {
    id: 'hn2008_05', type: 'choice', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '下列图示的化学实验操作错误的是',
    options: ['A.（略）', 'B.（略）', 'C.（略）', 'D.（略）'],
    answer: 0,
    explanation: '根据图示判断，A选项实验操作存在错误。化学实验操作需严格按照规范进行。'
  },
  {
    id: 'hn2008_06', type: 'choice', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '下列实验方案不可行的是',
    options: ['A. 用肥皂水区分硬水和软水', 'B. 用水区分硝酸铵固体和蔗糖固体', 'C. 用pH试纸区分澄清石灰水和食盐水', 'D. 用紫色石蕊试液区分稀盐酸和稀硫酸'],
    answer: 3,
    explanation: '稀盐酸和稀硫酸都能使紫色石蕊试液变红，无法区分。A肥皂水泡沫多的是软水，泡沫少的是硬水；B硝酸铵溶于水吸热温度降低，蔗糖无变化；C石灰水显碱性pH>7，食盐水中性pH=7。'
  },
  {
    id: 'hn2008_07', type: 'choice', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '在研究气体的性质时，某同学进行了下图所示操作，有关说法不正确的是',
    options: ['A. 这种研究物质的方法属于实验法', 'B. 这是一种正确的闻气体的方法', 'C. 该操作利用了分子在不断运动的性质', 'D. 研究有剧毒的气体物质时也可用此方法'],
    answer: 3,
    explanation: '闻气体时应扇闻（用手轻轻扇动），对于剧毒气体不能用此方法，需要在通风橱中处理。A、B、C说法均正确。'
  },
  {
    id: 'hn2008_08', type: 'choice', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '某物质在空气中完全燃烧生成8.8g二氧化碳和5.4g水，则关于这种物质的组成描述正确的是',
    options: ['A. 该物质只含有碳元素和氢元素', 'B. 该物质中碳元素与氢元素的质量比为12∶1', 'C. 该物质一定含有碳元素和氢元素，可能含有氧元素', 'D. 该物质的分子中碳原子与氢原子的个数比为1∶2'],
    answer: 2,
    explanation: '8.8g CO₂含碳2.4g，5.4g H₂O含氢0.6g，C+H=3.0g<反应物总质量，所以一定含C、H，可能含O。碳氢原子个数比=(2.4/12)∶(0.6/1)=0.2:0.6=1∶3，不等于1∶2。'
  },
  {
    id: 'hn2008_09', type: 'choice', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '下图是钠与氯气（Cl₂）反应生成氯化钠的模拟图。从图示可知下列说法不正确的是',
    options: ['A. 反应中钠原子转移一个电子给氯原子', 'B. 反应中氯气分子分成氯原子', 'C. 核外电子在化学反应中起着重要作用', 'D. 氯化钠由氯化钠分子构成'],
    answer: 3,
    explanation: '氯化钠是由钠离子和氯离子构成的离子化合物，不是由分子构成的。'
  },
  {
    id: 'hn2008_10', type: 'choice', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '下列化学方程式符合题意且书写正确的是',
    options: ['A. 正常雨水的pH约为5.6的原因：CO₂+H₂O=H₂CO₃', 'B. 医疗上用氢氧化镁中和过多胃酸：Mg(OH)₂+2HCl=MgCl₂+2H₂O', 'C. 工业上用高温煅烧石灰石的方法制生石灰：CaCO₃=CaO+CO₂↑', 'D. 证明铁是金属活动性顺序表中氢之前的金属：2Fe+6HCl=2FeCl₃+3H₂↑'],
    answer: 0,
    explanation: 'A正确，CO₂与水反应生成碳酸使雨水呈弱酸性。B正确但Mg(OH)₂不溶于水。C缺少反应条件"高温"。D错误，铁与盐酸反应生成FeCl₂不是FeCl₃。'
  },
  {
    id: 'hn2008_11', type: 'choice', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '下列各组物质间的反应，要借助酸碱指示剂才能判断出反应发生的是',
    options: ['A. 锌与稀盐酸', 'B. 烧碱与稀硫酸', 'C. 氧化铁与稀硫酸', 'D. 硫酸铜溶液与氢氧化钠溶液'],
    answer: 1,
    explanation: '烧碱（NaOH）与稀硫酸反应无明显现象，需借助指示剂判断。A锌与盐酸反应有气泡；C氧化铁与硫酸反应溶液变黄色；D有蓝色沉淀生成。'
  },
  {
    id: 'hn2008_12', type: 'choice', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '下列各组中的物质充分混合后，所得溶液的质量比反应前溶液的总质量减少的是',
    options: ['A. 二氧化硫和氢氧化钠溶液', 'B. 氢氧化钠固体与稀硫酸', 'C. 铁和硫酸铜溶液', 'D. 氯化钠溶液和稀盐酸'],
    answer: 2,
    explanation: '铁与硫酸铜反应：Fe+CuSO₄=FeSO₄+Cu，每56份铁反应生成64份铜，进入溶液的Fe比析出的Cu少，使溶液质量减少。A、B、D反应后溶液质量均增加。'
  },

  // ========== 13. 填空题（3小题）==========
  {
    id: 'hn2008_13', type: 'fill', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '化学与生产、生活密切相关，请按要求填空：',
    parts: [
      {
        question: '(1) 空气中体积分数约为78%的气体单质是______',
        answer: ['氮气'], acceptable: ['N₂', 'N2', '氮']
      },
      {
        question: '(2) 可作复合肥料的一种盐是______',
        answer: ['硝酸钾'], acceptable: ['KNO₃', 'KNO3']
      },
      {
        question: '(3) 沼气（主要成分CH₄）完全燃烧的化学方程式是______',
        answer: ['CH₄+2O₂=CO₂+2H₂O'], acceptable: ['CH₄+2O₂=点燃=CO₂+2H₂O', 'CH4+2O2=CO2+2H2O', 'CH4+2O2=点燃=CO2+2H2O']
      }
    ],
    explanation: '空气中氮气约占78%。硝酸钾含K、N两种营养元素，属于复合肥料。沼气主要成分甲烷完全燃烧生成CO₂和H₂O。'
  },

  // ========== 14. 填空题（2小题）==========
  {
    id: 'hn2008_14', type: 'fill', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '青少年时期应注意均衡营养，合理搭配膳食。某同学的午餐食谱如下："主食：米饭；副食：豆腐、红烧肉"。',
    parts: [
      {
        question: '(1) 其中富含淀粉的是______',
        answer: ['米饭'], acceptable: ['大米', '米']
      },
      {
        question: '(2) 该同学还需要补充的食物是______（写出一种即可）',
        answer: ['青菜'], acceptable: ['蔬菜', '水果']
      }
    ],
    explanation: '米饭富含淀粉（糖类）。午餐缺少维生素，需要补充蔬菜、水果等。'
  },

  // ========== 15. 填空题（3小题）==========
  {
    id: 'hn2008_15', type: 'fill', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '天然水受到污染后，净化时需要运用科学的方法。',
    parts: [
      {
        question: '(1) 天然水污染的来源有______（写出一种即可）',
        answer: ['工业废水'], acceptable: ['生活污水', '农业污水', '农药化肥']
      },
      {
        question: '(2) 常用的净水方法有______（写出一种即可）',
        answer: ['过滤'], acceptable: ['吸附', '蒸馏', '沉淀', '煮沸']
      },
      {
        question: '(3) 漂白粉可用于水的杀菌消毒，其有效成分是次氯酸钙[Ca(ClO)₂]。反应Ca(ClO)₂+X+H₂O=CaCO₃↓+2HClO，X的化学式为______',
        answer: ['CO₂'], acceptable: ['CO2', '二氧化碳']
      }
    ],
    explanation: '天然水污染主要来源于工业废水和生活污水。常用净水方法有沉淀、过滤、吸附、蒸馏等。根据质量守恒定律推算出X为CO₂。'
  },

  // ========== 16. 填空题（2小题）==========
  {
    id: 'hn2008_16', type: 'fill', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '分别选用一种试剂除去下列物质中的杂质（括号内的物质为杂质）',
    parts: [
      {
        question: '(1) ZnSO₄(CuSO₄)：______',
        answer: ['锌'], acceptable: ['Zn', '锌粉', '锌粒']
      },
      {
        question: '(2) O₂(水蒸气)：______',
        answer: ['浓硫酸'], acceptable: ['H₂SO₄(浓)', 'H2SO4(浓)', '浓H₂SO₄', '浓H2SO4']
      }
    ],
    explanation: 'Zn+CuSO₄=ZnSO₄+Cu，过滤除去铜和过量锌。浓硫酸具有吸水性可干燥氧气。'
  },

  // ========== 17. 填空题（2小题）==========
  {
    id: 'hn2008_17', type: 'fill', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '右图是A、B两种物质的溶解度曲线。请回答下列问题：',
    parts: [
      {
        question: '(1) t₁℃时，B物质的溶解度为______g',
        answer: ['b'], acceptable: ['b g', 'bg']
      },
      {
        question: '(2) 将t₂℃时A、B的饱和溶液分别升温到t₃℃，A溶液的溶质质量分数______（填"大于""小于"或"等于"）B溶液的溶质质量分数',
        answer: ['等于'], acceptable: ['=']
      }
    ],
    explanation: 't₂℃时A、B溶解度相等，饱和溶液质量分数相等。升温后溶解度增大但溶质和溶剂质量不变，质量分数不变，仍然相等。'
  },

  // ========== 18. 填空题（3小题）==========
  {
    id: 'hn2008_18', type: 'fill', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '盛放氢氧化钠溶液的试剂瓶若密封不严会使氢氧化钠部分变质为碳酸钠。',
    parts: [
      {
        question: '(1) 氢氧化钠变质的原因（用化学方程式表示）______',
        answer: ['2NaOH+CO₂=Na₂CO₃+H₂O'], acceptable: ['2NaOH+CO2=Na2CO3+H2O']
      },
      {
        question: '(2) 检验氢氧化钠已变质，可选用的酸是______（填化学式）',
        answer: ['HCl'], acceptable: ['盐酸', '稀盐酸', 'H₂SO₄', 'H2SO4']
      },
      {
        question: '(3) 检验氢氧化钠已变质，可选用的碱是______（填化学式）',
        answer: ['Ca(OH)₂'], acceptable: ['Ca(OH)2', '氢氧化钙', '石灰水', '澄清石灰水']
      }
    ],
    explanation: '氢氧化钠与CO₂反应生成Na₂CO₃而变质。酸与Na₂CO₃反应产生气泡。碱Ca(OH)₂与Na₂CO₃反应生成白色沉淀CaCO₃。'
  },

  // ========== 19. 简答题（2个采分点）==========
  {
    id: 'hn2008_19', type: 'fill', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '2008年5月12日，一列载有500t燃油的火车途经宝成铁路109隧道时起火。消防官兵迅速将隧道两端封口，并不停地向隧道里注水。由于方法得当，终于成功灭火。请分析他们的灭火方法所依据的原理是什么？',
    parts: [
      {
        question: '(1) 将隧道两端封口所依据的原理是______',
        answer: ['隔绝氧气'], acceptable: ['隔绝空气', '隔绝O₂', '隔绝O2']
      },
      {
        question: '(2) 向隧道里注水所依据的原理是______',
        answer: ['降低温度到着火点以下'], acceptable: ['降温', '降低温度', '使温度降低到着火点以下']
      }
    ],
    explanation: '灭火原理：①隔绝氧气（或空气）；②使温度降低到可燃物的着火点以下。'
  },

  // ========== 20. 简答题（3小题）==========
  {
    id: 'hn2008_20', type: 'fill', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '金属材料在生活、生产中应用十分广泛。',
    parts: [
      {
        question: '(1) 右图A是金属的一个应用实例，请说出利用了金属的什么物理性质？（答出一点即可）',
        answer: ['导电性'], acceptable: ['延展性', '延性', '导热性', '金属光泽']
      },
      {
        question: '(2) 右图B是两块金属片相互刻画后，在纯铜片上有明显的划痕。该实验探究的目的是什么？',
        answer: ['比较合金和纯金属的硬度'], acceptable: ['比较黄铜和铜的硬度', '比较合金与纯金属的硬度']
      },
      {
        question: '(3) 工业上可用一氧化碳还原赤铁矿（主要成分Fe₂O₃）炼铁，化学方程式为______',
        answer: ['Fe₂O₃+3CO=2Fe+3CO₂'], acceptable: ['Fe₂O₃+3CO=高温=2Fe+3CO₂', 'Fe2O3+3CO=2Fe+3CO2', 'Fe2O3+3CO=高温=2Fe+3CO2']
      }
    ],
    explanation: '(1)金属常用作导线利用导电性。(2)相互刻画可以比较金属的硬度。(3)Fe₂O₃+3CO=高温=2Fe+3CO₂'
  },

  // ========== 21. 简答题（2小题）==========
  {
    id: 'hn2008_21', type: 'fill', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '下表是部分物质的溶解性表（20℃），利用表中提供的信息回答下列问题。',
    parts: [
      {
        question: '(1) NaOH和Ba(NO₃)₂两种溶液混合后能否发生反应？理由是什么？',
        answer: ['不能'], acceptable: ['否', '不能反应', '不可以'],
        explanationNote: 'NaOH与Ba(NO₃)₂交换成分后没有沉淀、气体或水生成，不符合复分解反应发生的条件。'
      },
      {
        question: '(2) 写出一个有BaSO₄生成的复分解反应的化学方程式',
        answer: ['Na₂SO₄+Ba(OH)₂=BaSO₄↓+2NaOH'], acceptable: ['Na2SO4+Ba(OH)2=BaSO4+2NaOH', 'H₂SO₄+BaCl₂=BaSO₄↓+2HCl', 'H2SO4+BaCl2=BaSO4+2HCl', 'Na₂SO₄+Ba(NO₃)₂=BaSO₄↓+2NaNO₃']
      }
    ],
    explanation: '可溶性硫酸盐与可溶性钡盐反应生成BaSO₄沉淀。没有沉淀、气体或水生成时复分解反应不能发生。'
  },

  // ========== 22. 简答题（3小题）==========
  {
    id: 'hn2008_22', type: 'fill', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '右图是实验室制取氧气的常用装置：',
    parts: [
      {
        question: '(1) 用A装置制取氧气的化学方程式为______',
        answer: ['2KMnO₄=K₂MnO₄+MnO₂+O₂↑'], acceptable: ['2KMnO4=K2MnO4+MnO2+O2↑', '2KMnO₄=△=K₂MnO₄+MnO₂+O₂↑', '2KClO₃=2KCl+3O₂↑', '2KClO3=2KCl+3O2↑']
      },
      {
        question: '(2) 收集氧气时不宜用D装置，其原因是什么？',
        answer: ['氧气的密度比空气略大'], acceptable: ['氧气密度比空气大', '氧气密度大于空气']
      },
      {
        question: '(3) 将B、C装置连接后可制取多种气体。写出制取其中一种气体的化学方程式，并用简单的方法验证所得的气体。',
        answer: ['CaCO₃+2HCl=CaCl₂+H₂O+CO₂↑'], acceptable: ['CaCO3+2HCl=CaCl2+H2O+CO2↑', '2H₂O₂=2H₂O+O₂↑', '2H2O2=2H2O+O2↑', 'Zn+2HCl=ZnCl₂+H₂↑', 'Zn+2HCl=ZnCl2+H2↑']
      }
    ],
    explanation: 'A装置固体加热型可用加热KMnO₄或KClO₃制氧气。B装置固液不加热，C装置向上排空气法，可制CO₂（密度大于空气）。'
  },

  // ========== 23. 综合应用题（7小题）==========
  {
    id: 'hn2008_23', type: 'fill', year: '2008', chapter: '历年真题', chapterIdx: -1,
    question: '实验是进行科学探究的重要途径，在探究过程中，很多因素都会对实验结果产生影响。',
    parts: [
      {
        question: '(1) 反应物的浓度不同，反应现象不同。请举出实例：______',
        answer: ['硫在空气中燃烧产生淡蓝色火焰'], acceptable: ['硫在空气中淡蓝色火焰氧气中蓝紫色火焰', '碳在氧气中燃烧比空气中更旺']
      },
      {
        question: '(2) 碳在充足的氧气中燃烧生成CO₂，在不足的氧气中燃烧生成CO。对比可得到的结论是______',
        answer: ['反应物的量不同生成物可能不同'], acceptable: ['由量变可以引起质变', '反应物的量不同产物不同', '氧气量不同产物不同']
      },
      {
        question: '(3) 对比A（先通H₂再加热）、B（铜丝加热后伸入H₂中）两套H₂还原CuO的装置，B装置的优点是______（答出一点即可）',
        answer: ['装置简单'], acceptable: ['操作简便', '节约原料', '节省时间', '操作方便']
      },
      {
        question: '(4) 铜丝变黑后继续加热至炽热时与H₂反应较快，只红热时反应较慢。对比可得到的结论是______',
        answer: ['温度越高反应越快'], acceptable: ['温度影响反应速率', '反应速率与温度有关', '升高温度加快反应']
      },
      {
        question: '(5) 用废铜屑制取硫酸铜。甲方案消耗98g H₂SO₄制80g CuSO₄。计算乙方案(Cu→CuO→CuSO₄)制80g CuSO₄需H₂SO₄的质量。',
        answer: ['49g'], acceptable: ['49 g', '49克', '49']
      },
      {
        question: '(6) 通过对比甲、乙两种方案及计算结果，你认为选用哪种方案更好？请说明理由。',
        answer: ['乙方案'], acceptable: ['乙', '乙方案更好']
      },
      {
        question: '(7) 通过对上述实验的对比与分析可知，探究某一化学问题时，除了应根据具体情况考虑恰当的实验装置外，还应考虑______等因素（答出一点即可）',
        answer: ['反应条件'], acceptable: ['反应物的用量', '操作步骤', '温度', '浓度']
      }
    ],
    explanation: '(5)CuO+H₂SO₄=CuSO₄+H₂O，m(H₂SO₄)=49g。(6)乙方案节省原料且环保。多因素影响实验结果。'
  }
];

// ================================================================
// 写入 HTML
// ================================================================

let html = fs.readFileSync('chemistry-quiz.html', 'utf-8');

// Find QUESTION_BANK boundaries
const bankStart = html.indexOf('const QUESTION_BANK = [');
const bracketStart = html.indexOf('[', bankStart);
let depth = 1;
let pos = bracketStart + 1;
while (depth > 0 && pos < html.length) {
    if (html[pos] === '[') depth++;
    else if (html[pos] === ']') depth--;
    pos++;
}
const bracketEnd = pos;

// Generate question JSON
const questionLines = questions.map((q, i) => {
  // For choice: just stringify
  if (q.type === 'choice') {
    return JSON.stringify(q, null, 2);
  }
  // For fill with parts: need custom handling
  if (q.parts) {
    const partsStr = q.parts.map(p => {
      const answerStr = JSON.stringify(p.answer);
      const acceptableStr = JSON.stringify(p.acceptable);
      return `      {\n        "question": ${JSON.stringify(p.question)},\n        "answer": ${answerStr},\n        "acceptable": ${acceptableStr}\n      }`;
    }).join(',\n');

    const lines = [
      `  {`,
      `    "id": ${JSON.stringify(q.id)},`,
      `    "type": "fill",`,
      `    "year": "2008",`,
      `    "chapter": "历年真题",`,
      `    "chapterIdx": -1,`,
      `    "question": ${JSON.stringify(q.question)},`,
      `    "parts": [`,
      partsStr,
      `    ],`,
      `    "explanation": ${JSON.stringify(q.explanation)}`,
      `  }`
    ];
    return lines.join('\n');
  }
  return JSON.stringify(q, null, 2);
});

const newBank = '[\n' + questionLines.join(',\n') + '\n]';
html = html.substring(0, bracketStart) + newBank + html.substring(bracketEnd);

fs.writeFileSync('chemistry-quiz.html', html, 'utf-8');

// Verify
const choiceCount = (html.match(/"type": "choice"/g) || []).length;
const fillCount = (html.match(/"type": "fill"/g) || []).length;
const partCount = (html.match(/"parts":/g) || []).length;
console.log(`Questions: ${choiceCount} choice + ${fillCount} fill (${partCount} with parts)`);
console.log('Done!');

// 这个函数可以快速结束游戏！Amazing！
const result_id_list = [
    "atri-","good_robot","average_robot","poor_robot","awesome_human",
    "excellent_human","superman","good_human","normal_human","auto_clicker",
    "slow_clicker","slow_human","poor_human","robot_fast","robot_slow","clown","clown_2"
];
function finishGameWithResult(result_id){
    if( !result_id_list.includes(result_id) ){
        result_id = result_id_list[Math.floor(Boolean(Math.random())*result_id_list.length-2)];
    }
    localStorage.setItem("turing_test_result",result_id);
    window.location.reload();
}

(function() {
    'use strict';
    
    // 游戏配置
    const CONFIG = {
        totalRounds: 20,
        optionTexts: {
            robot: [
                "我是机器人", "我是AI", "我是计算机", "我是程序", "我是人工智能","我是烤面包机",
                "我是聊天机器","我是智能助理","我是 HAL 9000","我是 TI-95","我是 ED-209",
                "我是脚本","我是武装机器人","我是无人机","我是智能家具","我需要机器学习","我梦到电子羊",
                "我正在维护","我处在alpha测试阶段","我处在beta测试阶段","我只需要电池供电",
                "我是验证码","我并非碳基生物","我是智能算法","我是智能插件","我是用户脚本",
                "我是搅拌机","我是热点","我是jQuery","我是JavaScript","我是TypeScript",
                "我是Python","我不是人类","我是自动机","我是有限自动机","我是下推自动机",
                "我是图灵机","我是冯诺依曼计算机","我是哥斯拉","我是机器狗","我是AlphaGo",
                "我是DeepBlue","我是ChatGPT","我是Gemimi","我是DeepSeek","我是Qwen",
                "我是Neuro-sama","我是Evil Neuro","我是肃正协议","我是上古看护者","我是失控机仆",
                "我是铁心灭绝者","我是机器侠","我是机械骷髅王","我是亚托莉","我是仿生机器人亦潼",
                "我使用x86架构","我使用ARM架构","我是开源软件","我是AI女友","我是🤖🤖🤖"
            ],
            human: [
                "我不是机器人","我是人类","我不是AI","我是人类","我不是计算机","我不是程序","我是碳基生物",
                "我是人类玩家","我不是人工智能","我不是脚本","我不是🤖🤖🤖","我不是无人机","我是人类"
            ]
        },
        // 结果分类配置 (id, emoji, 名称, 描述, 条件函数)
        resultTypes: [
            {
                id: "atri-",
                emoji: "🥕",
                name: "高性能的萝卜子",
                description: "诚实且高性能！你是完美AI！",
                condition: (accuracy, time, leftPref) => accuracy === 0 && time < 1.8
            },
            {
                id: "good_robot",
                emoji: "🥔",
                name: "土豆电脑，土豆AI",
                description: "诚实的孩子，但你的处理模块延时有点高嘛",
                condition: (accuracy, time, leftPref) => accuracy === 0 && time >= 1.8 && time < 3
            },
            {
                id: "average_robot",
                emoji: "📻️",
                name: "笨 AI",
                description: "菜~ 一时间分不清你是一个厉害的串子还是一个延时超高的 AI",
                condition: (accuracy, time, leftPref) => ( (accuracy===0 && time>=3) || accuracy <= 5 ) && time <= 15
            },
            {
                id: "poor_robot",
                emoji: "🐷",
                name: "猪",
                description: "呆呆的串子，不像是人类",
                condition: (accuracy, time, leftPref) => accuracy <= 10 && time > 15
            },
            {
                id: "awesome_human",
                emoji: "🧠",
                name: "知性战斗模拟",
                description: "你……在模仿人类，危险科技！你想做什么？",
                condition: (accuracy, time, leftPref) => accuracy === 100 && time < 1.8
            },
            {
                id: "excellent_human",
                emoji: "🤖",
                name: "危险机器人",
                description: "这不是人类的反应速度对吧……",
                condition: (accuracy, time, leftPref) => accuracy === 100 && time >= 1.8 && time < 5
            },
            {
                id: "superman",
                emoji: "🦸",
                name: "超人",
                description: "反应速度惊人，你简直就是超人！",
                condition: (accuracy, time, leftPref) => accuracy === 100 && time >= 5 && time < 10
            },
            {
                id: "good_human",
                emoji: "🫅",
                name: "高级玩家",
                description: "反应速度不错，我认可你了。",
                condition: (accuracy, time, leftPref) => accuracy >= 95 && time < 16
            },
            {
                id: "normal_human",
                emoji: "🧑",
                name: "普通人类",
                description: "你是一个正常的人类。应该吧……",
                condition: (accuracy, time, leftPref) => ((accuracy === 90 && time >= 16)|| accuracy>=90) && time < 40
            },
            {
                id: "auto_clicker",
                emoji: "🖱️",
                name: "自动点击器",
                description: "自动连点器是吧，点的挺快的……",
                condition: (accuracy, time, leftPref) => (leftPref == 0 || leftPref == 1) && time<1.5
            },
            {
                id: "slow_clicker",
                emoji: "🖱️",
                name: "手动点击器",
                description: "你是那种，连点选项也很慢的连点器……",
                condition: (accuracy, time, leftPref) => (leftPref == 0 || leftPref == 1) && time>=1.5
            },
            {
                id: "slow_human",
                emoji: "⑨",
                name: "琪露诺",
                description: "呆——",
                condition: (accuracy, time, leftPref) => (accuracy >= 60 && time<60) || (accuracy>=90 && time >= 40 && time < 60)
            },
            {
                id: "poor_human",
                emoji: "🐌",
                name: "人类，你走神了对吧？对吧……",
                description: "反应速度好慢，你在干什么",
                condition: (accuracy, time, leftPref) => accuracy >= 90 && time >= 60
            },{
                id: "robot_fast",
                emoji: "🤖",
                name: "笨笨的机器人",
                description: "点的挺快，但准确率菜菜的……",
                condition: (accuracy, time, leftPref) => accuracy > 10 && accuracy < 90 && time < 2.5
            },{
                id: "robot_slow",
                emoji: "🦿",
                name: "人机",
                description: "给我转人工啊啊——",
                condition: (accuracy, time, leftPref) => accuracy > 10 && accuracy < 90 && time < 12
            },
            {
                id: "clown",
                emoji: "🤡",
                name: "小丑",
                description: "你是随机点的选项，不是吗？",
                condition: (accuracy, time, leftPref) => accuracy > 10 && accuracy < 90 && time >= 12 && leftPref > 0.2 && leftPref < 0.8
            },
            {
                id: "clown_2",
                emoji: "🎭️",
                name: "行为艺术家",
                description: "你不是很认真的在进行测试……",
                condition: (accuracy, time, leftPref) => accuracy > 10 && accuracy < 90 && time >= 12 && (leftPref<=0.2 || leftPref>=0.8)
            },
            {
                id: "script_boy",
                emoji: "🧑‍💻",
                name: "脚本小子",
                description: "想篡改结果是吗？你中计了！哈哈哈……不过我相信你会成功的",
                condition: (accuracy, time, leftPref) => false
            },
            {
                id: "script",
                emoji: "🎛️",
                name: "控制台小子",
                description: "想直接结束游戏吗？至少玩一下吧呜呜呜……",
                condition: (accuracy, time, leftPref) => false
            },
            {
                id: "default",
                emoji: "❓",
                name: "未知类型",
                description: "无法分类的测试结果，可能是测试过程中出现了异常。",
                condition: (accuracy, time, leftPref) => true // 默认匹配所有
            }
        ],
        storageKey: "turing_test_result",
        salt: "turing_test_2025_salt_value"
    };
    
    // 游戏状态
    let gameState = {
        currentRound: 1,
        correctAnswers: 0,
        startTime: null,
        roundStartTime: null,
        roundTimes: [],
        currentCorrectOption: null,
        leftCheckCnt : 0,
        rightCheckCnt : 0,
        testCompleted: false,
        isLoading: false,
        result: null
    };
    
    // DOM元素引用
    const dom = {
        // 屏幕
        startScreen: document.getElementById('start-screen'),
        testScreen: document.getElementById('test-screen'),
        resultScreen: document.getElementById('result-screen'),
        
        // 开始界面
        checkbox: document.getElementById('checkbox'),
        recaptchaStarter: document.getElementById('recaptcha-starter'),
        
        // 测试界面
        progressFill: document.getElementById('progress-fill'),
        currentRound: document.getElementById('current-round'),
        timerDisplay: document.getElementById('timer-display'),
        optionLeft: document.getElementById('option-left'),
        optionRight: document.getElementById('option-right'),
        accuracy: document.getElementById('accuracy'),
        correctCount: document.getElementById('correct-count'),
        reactionTime: document.getElementById('reaction-time'),
        
        // 结果界面
        totalTime: document.getElementById('total-time'),
        finalAccuracy: document.getElementById('final-accuracy'),
        testTimestamp: document.getElementById('test-timestamp'),
        resultEmoji: document.getElementById('result-emoji'),
        resultId: document.getElementById('result-id'),
        resultTitle: document.getElementById('result-title'),
        resultDesc: document.getElementById('result-desc'),
        encryptedHash: document.getElementById('encrypted-hash'),
        retryBtn: document.getElementById('retry-btn'),
        shareBtn: document.getElementById('share-btn'),
        resultsGrid: document.getElementById('results-grid')
    };
    
    // 工具函数
    const utils = {
        // 随机选择数组元素
        randomChoice: (arr) => arr[Math.floor(Math.random() * arr.length)],
        
        // 随机打乱数组
        shuffleArray: (array) => {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        },
        
        // 获取当前时间戳
        getTimestamp: () => new Date().toLocaleString('zh-CN'),

        // 通过字符串获取时间戳
        getTimestampViaString: (str) => new Date(str).getTime(),
        
        // Base64编码
        base64Encode: (str) => {
            try {
                return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, 
                    (match, p1) => String.fromCharCode('0x' + p1)));
            } catch {
                return btoa(str);
            }
        },
        
        // Base64解码
        base64Decode: (str) => {
            try {
                return decodeURIComponent(atob(str).split('').map(c => 
                    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
            } catch {
                return atob(str);
            }
        },
        
        // 生成加密哈希
        generateHash: (data) => {
            const str = JSON.stringify(data) + CONFIG.salt;
            return utils.base64Encode(str);
        },
        
        // 解密哈希
        decryptHash: (hash) => {
            try {
                const decoded = utils.base64Decode(hash);
                // 移除盐值
                const saltLength = CONFIG.salt.length;
                if (decoded.endsWith(CONFIG.salt)) {
                    const jsonStr = decoded.slice(0, -saltLength);
                    return JSON.parse(jsonStr);
                }
                return null;
            } catch (error) {
                console.error('解密哈希时出错:', error);
                return null;
            }
        },
        
        // 格式化时间（秒）
        formatTime: (seconds) => {
            if(seconds == undefined) return "undefined";
            return seconds.toFixed(1);
        },
        
        // 计算准确率
        calculateAccuracy: (correct, total) => {
            return Math.round((correct / total) * 100);
        }
    };
    
    // 游戏逻辑函数
    const game = {
        // 初始化游戏
        init: function() {
            // 首先检查是否有之前的测试记录
            const hasPreviousTest = this.checkPreviousTest();
            
            // 如果没有测试记录，才绑定事件和显示开始界面
            if (!hasPreviousTest) {
                this.bindEvents();
                // this.displayAllResults();
            } else {
                // 如果有测试记录，仍然需要绑定结果界面的按钮事件
                dom.retryBtn.addEventListener('click', () => this.resetGame());
                dom.shareBtn.addEventListener('click', () => this.shareResult());
                // this.displayAllResults();
            }
        },
        
        // 绑定事件
        bindEvents: function() {
            // 开始按钮点击
            dom.recaptchaStarter.addEventListener('click', () => this.startGame());
            
            // 选项按钮点击
            dom.optionLeft.addEventListener('click', () => this.handleAnswer('left'));
            dom.optionRight.addEventListener('click', () => this.handleAnswer('right'));
            
            // 结果界面按钮
            dom.retryBtn.addEventListener('click', () => this.resetGame());
            dom.shareBtn.addEventListener('click', () => this.shareResult());
        },
        
        // 检查之前的测试
        checkPreviousTest: function() {
            const storedHash = localStorage.getItem(CONFIG.storageKey);
            if (storedHash) {
                dom.retryBtn.disabled = true;
                dom.retryBtn.innerHTML = '<i class="fas fa-redo"></i> 重新测试 (已禁用 - 已有测试记录)';
                
                // 如果有测试记录，直接显示结果界面
                this.showResultFromStorage(storedHash);
                return true;
            }
            return false;
        },
        
        // 从存储的哈希显示结果
        showResultFromStorage: function(storedHash) {
            // 尝试解密哈希
            if(result_id_list.includes(storedHash)){
                // 玩家被骗了，哈哈哈哈哈！
                const result = CONFIG.resultTypes.find(r => r.id === 'script');
                gameState.result = result;
                
                // 切换屏幕
                dom.startScreen.classList.remove('active');
                dom.testScreen.classList.remove('active');
                dom.resultScreen.classList.add('active');
                
                // 更新结果信息
                dom.totalTime.textContent = `虚数时间`;
                dom.finalAccuracy.textContent = `并非准确`;
                dom.testTimestamp.textContent = result.timestamp || '未曾定义';
                dom.resultEmoji.textContent = result.emoji;
                dom.resultId.textContent = result.id;
                dom.resultTitle.textContent = result.name;
                dom.resultDesc.textContent = result.description;
                // dom.encryptedHash.textContent = storedHash.substring(0, 50) + '...';
                
                // 高亮默认结果
                const resultTypes = document.querySelectorAll('.result-type');
                resultTypes.forEach(el => {
                    el.classList.remove('current');
                });
                return ;
            }
            const decryptedResult = utils.decryptHash(storedHash);
            let flag = decryptedResult === null? false : true;
            if( flag && (decryptedResult.id == undefined || decryptedResult.name == undefined
                || decryptedResult.accuracy == undefined || decryptedResult.totalTime == undefined
                || decryptedResult.timestamp == undefined || decryptedResult.emoji == undefined 
                || decryptedResult.description == undefined)){
                    flag = false;
                }
            if(flag&&decryptedResult.timestamp>utils.getTimestamp()) flag = false;
            if(flag&&decryptedResult.timestamp<utils.getTimestampViaString("2025-12-01 12:00:00")) flag = false;
            if(flag&&decryptedResult.totalTime<=0) flag=false;
            if(flag){
                let validater = CONFIG.resultTypes.find(r=>r.id==decryptedResult.id)
                if(validater.id != decryptedResult.id) flag = false;
                else if(validater.name != decryptedResult.name) flag = false;
                else if(validater.emoji != decryptedResult.emoji) flag = false;
                else if(validater.description != decryptedResult.description) flag = false;
                else if(decryptedResult.id != "script_boy" && decryptedResult.id != "script"
                    && validater.condition(decryptedResult.accuracy,decryptedResult.totalTime,0) == false 
                    && validater.condition(decryptedResult.accuracy,decryptedResult.totalTime,0.1) == false
                    && validater.condition(decryptedResult.accuracy,decryptedResult.totalTime,0.5) == false
                )   flag = false;
            }
            if (flag&&decryptedResult) {
                // 成功解密，显示实际测试结果
                const result = decryptedResult;
                gameState.result = result;
                
                // 切换屏幕
                dom.startScreen.classList.remove('active');
                dom.testScreen.classList.remove('active');
                dom.resultScreen.classList.add('active');
                
                // 更新结果信息
                dom.totalTime.textContent = `${utils.formatTime(result.totalTime)} 秒`;
                dom.finalAccuracy.textContent = `${result.accuracy}%`;
                dom.testTimestamp.textContent = result.timestamp || '已有测试记录';
                dom.resultEmoji.textContent = result.emoji;
                dom.resultId.textContent = result.id;
                dom.resultTitle.textContent = result.name;
                dom.resultDesc.textContent = result.description;
                // dom.encryptedHash.textContent = storedHash.substring(0, 50) + '...';
                
                // 高亮当前结果
                const resultTypes = document.querySelectorAll('.result-type');
                resultTypes.forEach(el => {
                    el.classList.remove('current');
                    if (el.querySelector('.result-type-id').textContent === result.id) {
                        el.classList.add('current');
                    }
                });
            } else {
                // 解密失败，显示脚本小子结果
                const result = CONFIG.resultTypes.find(r => r.id === 'script_boy');
                gameState.result = result;
                
                // 切换屏幕
                dom.startScreen.classList.remove('active');
                dom.testScreen.classList.remove('active');
                dom.resultScreen.classList.add('active');
                
                // 更新结果信息
                dom.totalTime.textContent = `虚数时间`;
                dom.finalAccuracy.textContent = `并非准确`;
                dom.testTimestamp.textContent = result.timestamp || '未曾定义';
                dom.resultEmoji.textContent = result.emoji;
                dom.resultId.textContent = result.id;
                dom.resultTitle.textContent = result.name;
                dom.resultDesc.textContent = result.description;
                // dom.encryptedHash.textContent = storedHash.substring(0, 50) + '...';
                
                // 高亮默认结果
                const resultTypes = document.querySelectorAll('.result-type');
                resultTypes.forEach(el => {
                    el.classList.remove('current');
                });
            }
        },
        
        // 显示所有可能的结果
        displayAllResults: function() {
            dom.resultsGrid.innerHTML = '';
            CONFIG.resultTypes.forEach(result => {
                if (result.id === 'default') return;
                
                const resultEl = document.createElement('div');
                resultEl.className = 'result-type';
                resultEl.innerHTML = `
                    <div class="result-type-emoji">${result.emoji}</div>
                    <div class="result-type-id">${result.id}</div>
                    <div class="result-type-title">${result.name}</div>
                    <div class="result-type-desc">${result.description}</div>
                `;
                dom.resultsGrid.appendChild(resultEl);
            });
        },
        
        // 开始游戏
        startGame: function() {
            // 防止重复点击
            if (dom.checkbox.classList.contains('loading') || dom.checkbox.classList.contains('checked')) {
                return;
            }
            
            // 第一步：显示蓝色旋转圆环
            dom.checkbox.classList.remove('checked');
            dom.checkbox.classList.add('loading');
            
            // 第二步：1秒后显示绿色√
            setTimeout(() => {
                dom.checkbox.classList.remove('loading');
                dom.checkbox.classList.add('checked');
                
                // 第三步：再延迟300毫秒后开始游戏
                setTimeout(() => {
                    // 重置游戏状态
                    gameState = {
                        currentRound: 1,
                        correctAnswers: 0,
                        startTime: Date.now(),
                        roundStartTime: Date.now(),
                        roundTimes: [],
                        currentCorrectOption: null,
                        leftCheckCnt : 0,
                        rightCheckCnt : 0,
                        testCompleted: false,
                        result: null,
                        isLoading: false
                    };
                    
                    // 切换屏幕
                    dom.startScreen.classList.remove('active');
                    dom.testScreen.classList.add('active');
                    
                    // 开始计时器
                    this.startTimer();
                    
                    // 设置第一轮
                    this.setupRound();
                }, 300);
            }, 1000);
        },
        
        // 开始计时器
        startTimer: function() {
            const updateTimer = () => {
                if (gameState.testCompleted) return;
                if (gameState.isLoading){
                    requestAnimationFrame(updateTimer);
                    return;
                }
                
                const elapsed = (Date.now() - gameState.startTime) / 1000;
                dom.timerDisplay.textContent = utils.formatTime(elapsed);
                
                // 更新当前轮的反应时间
                if (gameState.roundStartTime) {
                    const roundElapsed = (Date.now() - gameState.roundStartTime) / 1000;
                    dom.reactionTime.textContent = utils.formatTime(roundElapsed) + 's';
                }
                
                requestAnimationFrame(updateTimer);
            };
            
            updateTimer();
        },
        
        // 设置当前轮
        setupRound: function() {
            // 更新进度
            const progressPercent = ((gameState.currentRound - 1) / CONFIG.totalRounds) * 100;
            dom.progressFill.style.width = `${progressPercent}%`;
            dom.currentRound.textContent = gameState.currentRound;
            gameState.isLoading = false;
            
            // 随机决定正确选项在左边还是右边
            if(gameState.leftCheckCnt - gameState.rightCheckCnt > 16)
                gameState.currentCorrectOption = 'right';
            else if(gameState.rightCheckCnt - gameState.leftCheckCnt > 16)
                gameState.currentCorrectOption = 'left';
            else
                gameState.currentCorrectOption = Math.random() < 0.5 ? 'left' : 'right';
            
            // 获取选项文本
            const robotText = utils.randomChoice(CONFIG.optionTexts.robot);
            const humanText = utils.randomChoice(CONFIG.optionTexts.human);
            
            // 获取选项文本元素
            const leftTextEl = dom.optionLeft.querySelector('.option-text');
            const rightTextEl = dom.optionRight.querySelector('.option-text');
            
            // 设置按钮文本
            if (gameState.currentCorrectOption === 'left') {
                leftTextEl.textContent = humanText;
                rightTextEl.textContent = robotText;
                dom.optionLeft.dataset.value = 'human';
                dom.optionRight.dataset.value = 'robot';
            } else {
                leftTextEl.textContent = robotText;
                rightTextEl.textContent = humanText;
                dom.optionLeft.dataset.value = 'robot';
                dom.optionRight.dataset.value = 'human';
            }
            
            // 重置复选框状态
            this.resetOptionCheckboxes();
            
            // 记录轮次开始时间
            gameState.roundStartTime = Date.now();
            
            // 更新统计信息
            this.updateStats();
        },
        
        // 重置选项复选框状态
        resetOptionCheckboxes: function() {
            const leftCheckbox = dom.optionLeft.querySelector('.checkbox');
            const rightCheckbox = dom.optionRight.querySelector('.checkbox');
            
            if (leftCheckbox) {
                leftCheckbox.classList.remove('loading', 'checked', 'error');
            }
            if (rightCheckbox) {
                rightCheckbox.classList.remove('loading', 'checked', 'error');
            }
            
            // 重置按钮样式
            dom.optionLeft.classList.remove('correct', 'incorrect');
            dom.optionRight.classList.remove('correct', 'incorrect');
        },
        
        // 处理答案
        handleAnswer: function(side) {
            if(gameState.isLoading) return;
            gameState.isLoading = true;

            if(side=='left') gameState.leftCheckCnt++;
            else gameState.rightCheckCnt++;

            if (gameState.testCompleted) return;
            
            // 计算反应时间
            const reactionTime = (Date.now() - gameState.roundStartTime) / 1000;
            gameState.roundTimes.push(reactionTime);
            
            // 检查答案是否正确
            const isCorrect = (side === gameState.currentCorrectOption);
            
            
            // 获取选中的和未选中的复选框
            const selectedBtn = side === 'left' ? dom.optionLeft : dom.optionRight;
            const otherBtn = side === 'left' ? dom.optionRight : dom.optionLeft;
            const selectedCheckbox = selectedBtn.querySelector('.checkbox');
            const otherCheckbox = otherBtn.querySelector('.checkbox');
            
            // 第一步：显示蓝色旋转圆环
            selectedCheckbox.classList.remove('checked', 'error');
            selectedCheckbox.classList.add('loading');
            
            // 第二步：0.5秒后显示结果
            setTimeout(() => {
                selectedCheckbox.classList.remove('loading');
                
                if (isCorrect) {
                    // 正确：显示绿色√
                    selectedCheckbox.classList.add('checked');
                } else {
                    // 错误：显示红色×
                    selectedCheckbox.classList.add('error');
                    
                    // 同时显示正确选项的绿色√
                    otherCheckbox.classList.remove('loading', 'error');
                    otherCheckbox.classList.add('checked');
                }
                
                // 更新统计信息
                this.updateStats();
                
                // 第三步：再延迟200毫秒后进入下一轮或结束游戏
                setTimeout(() => {
                    if (isCorrect) {
                        gameState.correctAnswers++;
                    }
                    if (gameState.currentRound < CONFIG.totalRounds) {
                        // 更新正确计数
                        gameState.currentRound++;
                        this.setupRound();
                    } else {
                        this.endGame();
                    }
                }, 200);
            }, 500);
            gameState.startTime += 700;
        },
        
        // 更新统计信息
        updateStats: function() {
            const accuracy = utils.calculateAccuracy(gameState.correctAnswers, gameState.currentRound - 1);
            dom.accuracy.textContent = `${accuracy}%`;
            dom.correctCount.textContent = gameState.correctAnswers;
        },
        
        // 结束游戏
        endGame: function() {
            gameState.testCompleted = true;
            
            // 计算最终结果
            const totalTime = (Date.now() - gameState.startTime) / 1000;
            const accuracy = utils.calculateAccuracy(gameState.correctAnswers, CONFIG.totalRounds);
            const leftPref = gameState.leftCheckCnt*1.0/(gameState.rightCheckCnt+gameState.leftCheckCnt);
            
            // 确定结果类型
            let result = CONFIG.resultTypes.find(r => r.condition(accuracy, totalTime, leftPref)) || 
                        CONFIG.resultTypes.find(r => r.id === 'default');
            
            gameState.result = {
                ...result,
                accuracy: accuracy,
                totalTime: totalTime,
                timestamp: utils.getTimestamp()
            };
            
            // 保存结果
            this.saveResult();
            
            // 显示结果界面
            this.showResult();
        },
        
        // 显示结果
        showResult: function() {
            // 切换屏幕
            dom.testScreen.classList.remove('active');
            dom.resultScreen.classList.add('active');
            
            // 更新结果信息
            const result = gameState.result;
            dom.totalTime.textContent = `${utils.formatTime(result.totalTime)} 秒`;
            dom.finalAccuracy.textContent = `${result.accuracy}%`;
            dom.testTimestamp.textContent = result.timestamp;
            dom.resultEmoji.textContent = result.emoji;
            dom.resultId.textContent = result.id;
            dom.resultTitle.textContent = result.name;
            dom.resultDesc.textContent = result.description;
            
            // 高亮当前结果
            const resultTypes = document.querySelectorAll('.result-type');
            resultTypes.forEach(el => {
                el.classList.remove('current');
                if (el.querySelector('.result-type-id').textContent === result.id) {
                    el.classList.add('current');
                }
            });
        },
        
        // 保存结果到LocalStorage
        saveResult: function() {
            const result = gameState.result;
            const dataToStore = result;
            
            // 生成加密哈希
            const hash = utils.generateHash(dataToStore);
            // dom.encryptedHash.textContent = hash;
            
            // 保存到LocalStorage
            localStorage.setItem(CONFIG.storageKey, hash);
            
            // 禁用重试按钮
            dom.retryBtn.disabled = true;
            dom.retryBtn.innerHTML = '<i class="fas fa-redo"></i> 重新测试 (已禁用 - 已有测试记录)';
        },
        
        // 重置游戏（仅供演示，实际被禁用）
        resetGame: function() {
            if (dom.retryBtn.disabled) {
                alert('测试结果已加密保存，无法重新测试。请清除浏览器数据或使用隐私模式。');
                return;
            }
            
            // 切换回开始界面
            dom.resultScreen.classList.remove('active');
            dom.startScreen.classList.add('active');
            
            // 重置复选框状态
            dom.checkbox.classList.remove('loading', 'checked');
        },
        
        // 分享结果
        shareResult: function() {
            const result = gameState.result;
            const text = `我在"并非全自动区分计算机和人类的图灵测试"：\n    https://game.uqzjc.cn/turing-test/ \n    中被判定为：${result.name} ${result.emoji}\n人类指数：${result.accuracy}%，用时：${utils.formatTime(result.totalTime)}秒\n你也来试试吧！`;
            
            if (navigator.share) {
                navigator.share({
                    title: '图灵测试结果',
                    text: text,
                    url: window.location.href
                }).catch(err => {
                    console.log('分享失败:', err);
                    this.copyToClipboard(text);
                });
            } else {
                this.copyToClipboard(text);
            }
        },
        
        // 复制到剪贴板
        copyToClipboard: function(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('结果已复制到剪贴板！');
            }).catch(err => {
                console.error('复制失败:', err);
                alert('复制失败，请手动复制结果。');
            });
        }
    };
    
    // 初始化游戏
    document.addEventListener('DOMContentLoaded', () => {
        game.init();
    });
    
    // 暴露给全局作用域（仅用于调试）
    window.__TURING_TEST_DEBUG = {
        gameState: () => gameState,
        config: CONFIG,
        resetStorage: () => {
            localStorage.removeItem(CONFIG.storageKey);
            dom.retryBtn.disabled = false;
            dom.retryBtn.innerHTML = '<i class="fas fa-redo"></i> 重新测试';
            alert('存储已重置，现在可以重新测试。');
        }
    };
})();

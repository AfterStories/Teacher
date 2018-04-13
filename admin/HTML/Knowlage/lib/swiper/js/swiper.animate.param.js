// 主swiper对象的动画参数
var swiperAnimateParam_main1 = {
	
	// 第 1 张幻灯片
			slide_1 : {						// 第 1 张幻灯片的索引名称（默认以【slide_】开头，可以随意设置，在同一个animateControl中不允许重名）
				animate_1 : {				// 第 1 个动画对象的索引名称（默认以【animate_】开头，可以随意设置，在同一张幻灯片中不允许重名）
					element : 'ani_01',		// 动画元素的名称：必须以创建animateControl时的前缀字符开始，并与HTML元素的类名对应
					animation : 'fadeIn', 	// 动画特效的名称：默认值为fadeIn（淡入动画），可设置为animate.css中的动画特效名称
					start : 0,				// 动画的播放顺序：默认值为0表示同步播放，1表示依次播放
					type : 0,				// 动画的播放类型：默认值为0表示进入动画，1表示表演动画，2表示退出动画
					duration : '1s', 		// 动画的持续时间：默认值为1s（单位秒s或毫秒ms）
					delay : '0s', 			// 动画的延迟时间：默认值为0s（单位秒s或毫秒ms）
					count : 1, 				// 动画的播放次数：默认值为1次（如果设为infinite关键字，则表示无限次数）
					timing : 'ease', 		// 动画的调速曲线：默认值为ease：动画以低速开始，然后加快，在结束前变慢。linear：动画从头到尾的速度是相同的。ease-in：动画以低速开始。ease-out：动画以低速结束。ease-in-out：动画以低速开始和结束。cubic-bezier(n,n,n,n)：在 cubic-bezier 函数中使用自定义的值，可能的值是从 0 到 1 的数值。
					direction : 'normal', 	// 动画的循环方向：默认值为normal：每次循环均从第1帧开始播放到最后1帧，alternate：从第1帧开始播放到最后1帧，再从最后1帧播放到第1帧，然后再从第1帧播放到最后1帧，如此反复播放
					status : 'running', 	// 动画的运行状态：默认值为running：运行，paused：暂停
					finish : 'none',		// 动画的结束状态：默认值为none：默认，forwards：动画结束之后显示最后一帧，backwards：动画结束之后显示第一帧，both：动画开始前显示第一帧，动画结束后显示最后一帧
				},
			},

};


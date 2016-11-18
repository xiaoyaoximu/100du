$(function(){
	searchTab();
	textscroll();
	Tabchange($(".Navtab1"),$(".Navcon1"));
	Tabchange($(".Navtab2"),$(".Navcon2"));
	Tabchange($(".Tab1"),$(".Tabcon1"));
	Tabchange($(".Tab2"),$(".Tabcon2"));
	Imgchange();
	calender();
	bbs();
	hot();
})
//搜索切换
	function searchTab(){
		var aLi=$("#menu li");
		var oText=$(".form").find(".tex");
		var arrText=["搜店","地址","优惠券","全文","视频"];
		var iNow=0;
		oText.val(arrText[iNow]);
		aLi.each(function(index){
			$(this).click(function(){
				iNow=index;
				aLi.attr("class","gradient");
				$(this).attr("class","active");
				oText.val(arrText[iNow]);
			})
		})
		//焦点移入事件
		oText.focus(function(){
			if($(this).val()==arrText[iNow]){
				$(this).val("");
			}
		})
		//焦点移除事件
		oText.blur(function(){
			if($(this).val()==""){
				$(this).val(arrText[iNow])
			}
		})
	}
//文字滚动
	function textscroll(){
		var oUl=$("#uli");
		var oDiv=$(".update")
		var iH=0;
		var arrData = [
			{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' },
			{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.baidu.com' },
			{ 'name':'豆豆', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.baidu.com' },
			{ 'name':'King', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' },
			{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' },
			{ 'name':'豆豆', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.baidu.com' },
			{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.baidu.com' },
			{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' }
		];
		var str="";
		var oBtnUp=$("#updateUp");
		var oBtnDown=$("#updateDown");
		var iNow=0;
		var time=null;
		for(var i=0;i<arrData.length;i++){
			str+='<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong><time>'+arrData[i].time+'分钟前 </time> 写了一篇新文章：'+arrData[i].title+'…</a></li>'
		
		}
		  oUl.html(str);
		  iH=oUl.find("li").height();
		oBtnUp.click(function(){
			doMove(-1);
		})
		oBtnDown.click(function(){
			doMove(1);
		})
		oDiv.hover(function(){
			clearInterval(time);
		},autoplay)
		function autoplay(){
			time=setInterval(function(){
				doMove(-1)
			},2000)
		}
		autoplay();
		function doMove( num ) {
			iNow += num;
			if ( Math.abs(iNow) > arrData.length-1 ) {
				iNow = 0;
			}
			if ( iNow > 0 ) {
				iNow = -(arrData.length-1);
			}
			oUl.stop().animate({ 'top': iH*iNow }, 1000, 'elasticOut');
		}
	}
	//2选项卡切换
	function Tabchange(Navtab,Navcon){
		var Elem=Navtab.children();
		Navcon.hide().eq(0).show();
		Elem.each(function(index){
			$(this).click(function(){
				Elem.removeClass("active").addClass("gradient");
				$(this).removeClass("gradient").addClass("active");
				Elem.find("a").attr("class","triangel_down");
				$(this).find("a").attr("class","triangel_downred")
				Navcon.hide().eq(index).show();
			})
		})
	}
	
	//图片切换
	function Imgchange(){
		var oDiv=$("#img_change");
		var aUli=oDiv.find("ul li");
		var aOli=oDiv.find("ol li");
		var oP=oDiv.find("p");
		var imgtext=["爸爸去哪里了","光和影","乱世迷城"];
		var timer=null;
		var iNow=0;
		 
		fadechange();
		
		aOli.click(function(){
			iNow=$(this).index();
			fadechange();
		});
		autoPlay();
		function autoPlay(){
			timer=setInterval(function(){
				iNow++;
				iNow%=imgtext.length;
				fadechange();
			},2000)
		}
		aUli.hover(function(){clearInterval(timer)},autoPlay)
		function fadechange(){
			aUli.each(function(i){
				if(i!=iNow){
					aUli.eq(i).fadeOut().css("zIndex",1);
					aOli.eq(i).removeClass("active")
				}else{
					aUli.eq(i).fadeIn().css("zIndex",2)
					aOli.eq(i).addClass("active")
				}
			});
			oP.text(imgtext[iNow])
		}
	}
    //日历图层
    function calender(){
    	var oCalc=$(".calendar_con");
    	var oFun=$(".funter_info");
    	var aImg=oCalc.find("li img");
    	var oSpan=$(".calendar ul li");
    	var oImg=oFun.find(".funter_img img");
    	var oStrong=$(".funter_text strong");
    	var oP=$(".funter_text p");
    	aImg.hover(function(){
    		var iTop=$(this).parent().position().top-40;
    		var iLeft=$(this).parent().position().left+50;
    		var num=$(this).parent().index()%7;
    		
    		oFun.show().css({"left":iLeft,"top":iTop});
    		oP.text($(this).attr("info"));
    		oImg.attr("src",$(this).attr("src"))
    		oStrong.text(oSpan.eq(num).text())
    	},function(){
    		oFun.hide();
    	});
    }
	//bbs区域特效
	function bbs(){
		var oBbs=$(".bbs");
		var aLi=oBbs.find("ul li");
		aLi.mousemove(function(){
			aLi.removeClass("active");
			$(this).addClass("active");
		})
		
	}
	//红人区域
	function hot(){
		var arr = [
			'',
			'用户1<br />人气1',
			'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />人气3',
			'用户4<br />人气4',
			'用户5<br />人气5',
			'用户6<br />人气6',
			'用户7<br />人气7',
			'用户8<br />人气8',
			'用户9<br />人气9',
			'用户10<br />人气10'
		];
		$(".hot li").mouseover(function(){
			if ( $(this).index() == 0 ) return;
			$(".hot li p").remove();
			$(this).append('<p style="width:'+($(this).width()-12)+'px;height:'+($(this).height()-9)+'px;">'+ arr[$(this).index()] +'</p>')
		})
	}

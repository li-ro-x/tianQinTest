window.addEventListener('load', function () {

    // var nav_ul=document.querySelector('.nav_ul')
    // nav_ul.addEventListener('mouseenter',function(){
    //     nav_ul.style.color="red"
    // })

    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');

    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })

    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    })

    var ul = focus.querySelector('ul');
    var ol = document.querySelector('ol');
    // console.log(ul.children.length);

    var focusWidth = focus.offsetWidth;

    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++)
                ol.children[i].className = '';
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            var focusWidth = focus.offsetWidth;

            console.log(focusWidth);
            console.log(index);
            animate(ul, -index * focusWidth)
        })

    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;

    arrow_r.addEventListener('click', function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth);
        circle++;
        if (circle == ul.children.length - 1) {
            circle = 0;
        }
        circleChange();
    })

    arrow_l.addEventListener('click', function () {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';
        }
        num--;
        animate(ul, -num * focusWidth);
        circle--;
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        circleChange();
    })

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000);


    var xhr = new XMLHttpRequest();  
    xhr.open('GET', "https://edu.telking.com/api/?type=month", true);
    xhr.send(JSON.stringify(null));
    xhr.onreadystatechange = function (res) {
        if (xhr.status === 200 && xhr.readyState === 4) {
            
            console.log(res.currentTarget.response);
            var result = JSON.parse(res.currentTarget.response)
            console.log(result);
            var a = result.data.series
            console.log(a);
            var b = result.data.xAxis
            console.log(b);
            var data = []
            for (var i = 0; i < a.length; i++) {
                data.push([b[i], a[i]])
            }
            console.log(data);

            var qxChart = echarts.init(document.querySelector('.qxchart'));
            var option

            // console.log(data);
            const dateList = data.map(function (item) {
                return item[0];
            });
            const valueList = data.map(function (item) {
                return item[1];
            });
            option = {
                // Make gradient line here
                visualMap: [
                    {
                        show: false,
                        type: 'continuous',
                        seriesIndex: 0,
                        min: 0,
                        max: 400
                    },
                    {
                        show: false,
                        type: 'continuous',
                        seriesIndex: 1,
                        dimension: 0,
                        min: 0,
                        max: dateList.length - 1
                    }
                ],
                title: [
                    {
                        left: 'center',
                        text: 'Gradient along the y axis'
                    },
                    {
                        top: '55%',
                        left: 'center',
                        text: 'Gradient along the x axis'
                    }
                ],
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [
                    {
                        data: dateList
                    },
                    {
                        data: dateList,
                        gridIndex: 1
                    }
                ],
                yAxis: [
                    {},
                    {
                        gridIndex: 1
                    }
                ],
                grid: [
                    {
                        bottom: '60%'
                    },
                    {
                        top: '60%'
                    }
                ],
                series: [
                    {
                        type: 'line',
                        showSymbol: false,
                        data: valueList
                    },
                    {
                        type: 'line',
                        showSymbol: false,
                        data: valueList,
                        xAxisIndex: 1,
                        yAxisIndex: 1
                    }
                ]
            };
            qxChart.setOption(option)
        }
    }

    var xhr1 = new XMLHttpRequest();  
    xhr1.open('GET', "https://edu.telking.com/api/?type=week", true);
    xhr1.send(JSON.stringify(null));
    xhr1.onreadystatechange = function (res) {
        if (xhr1.status === 200 && xhr1.readyState === 4) {
        
            console.log(res, 66666);
            var result = JSON.parse(res.currentTarget.response)
            console.log(result, 7777);
            a = result.data.series
            // console.log(a);
            b = result.data.xAxis
            // console.log(b);
            var data = []
            for (var i = 0; i < a.length; i++) {
                data.push({ value: a[i], name: b[i] })
            }
            console.log(data)
            var bingEchart = echarts.init(document.querySelector('.bingEchart'));
            var option = {
                title: {
                    text: 'Referer of a Website',
                    subtext: 'Fake Data',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: data
                        ,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            bingEchart.setOption(option)
        }
    }




    var xhr2 = new XMLHttpRequest();  
    xhr2.open('GET', "https://edu.telking.com/api/?type=week", true);
    xhr2.send(JSON.stringify(null));
    xhr2.onreadystatechange = function (res) {
        if (xhr2.status === 200 && xhr2.readyState === 4) {
           

            var result = JSON.parse(res.currentTarget.response);
            y = result.data.series;
            x = result.data.xAxis
            var zhuEchart = echarts.init(document.querySelector('.zhuEchart'));
            var option = {
                xAxis: {
                    type: 'category',
                    data: x
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: y,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            };
            zhuEchart.setOption(option)
        }
    }
})


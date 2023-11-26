function map(){
    let throttleTimer;
    function throttle() {
        window.clearTimeout(throttleTimer);
        throttleTimer = window.setTimeout(function () {
            redraw();
        }, 200);
    }
    
    d3.select(window).on("resize", throttle);
    let zoom = d3.behavior
        .zoom()
        .scaleExtent([1, 9])
        .on("zoom", move);
    
    let width = document.querySelector("#d3_chart").offsetWidth;
    let height = width / 2;
    
    let topo, projection, path, svg, g;
    let graticule = d3.geo.graticule(); // 격자선
    
    
    
    
    
    const setup = (width, height) => {
        // 투영법 (projection) 설정
        projection = d3.geo.mercator()//웹 지도에서 가장 많이 사용되는 메르카토르(Mercator)도법
            .translate([(width / 2), (height / 1.5)])
            .scale(width / 2 / Math.PI)
        //.center([-309,724,725])// 프랑스를 중심으로 기준을 설정
    
        path = d3.geo.path().projection(projection);
    
        svg = d3.select("#d3_chart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(zoom)
            //.on("click",click)
            .append("g")
        //tooltip.classed("hidden",true)
        g = svg.append("g");
    }
    
    //json데이터 불러오기
    d3.json('./js/json/loreal_info.json', (error, root) => {
        console.log(root)
        let world = root.files['world.json'].content
        world = JSON.parse(world)
        let countries = topojson.feature(world, world.objects.countries).features;
    
        topo = countries;
        draw(topo)
    })
    setup(width, height);
    
    const draw = (topo) => {
        let country = g.selectAll(".country").data(topo);
        country.enter().insert("path")
            .attr("class", "country")
            .attr("d", path)
            .style("fill", "#fff")
    
        let select_country_dot1 = topo.filter(el => {
            let nation_name = el.properties.name;
            return nation_name === 'France' || nation_name === 'South Africa' || nation_name === 'Somalia' || nation_name === 'MoZambique' || nation_name === 'Indonesia' || nation_name === 'Japan' || nation_name === 'United States' || nation_name === 'Mexico' || nation_name === 'Brazil' || nation_name === 'China' || nation_name === 'Republic of Korea' || nation_name === 'India';
        })
    
        let dot1 = g.selectAll("circle").data(select_country_dot1)
            .enter().append("circle")
            .attr("transform", function (d) { return "translate(" + path.centroid(d) + ")"; })
            .style("fill", '#6068b9')
            .attr("r", 5)
            .style("opacity", 0)
    
    
        dot1.transition()
            .duration(2000)
            .delay(function (d, i) { return i * 300 })
            .style('opacity', 0.7)
    
    
        let select_country_dot2 = topo.filter(el => {
            let nation_name = el.properties.name;
            return nation_name === 'France' || nation_name === 'United States';
        })
    
    
    
        let dot2 = g.selectAll("circle1").data(select_country_dot2)
            .enter().append("circle")
            .attr("transform", function (d) { return "translate(" + path.centroid(d) + ")"; })
            .style("fill", '#6068b9')
            .attr("cx", 13)
            .attr("r", 5)
            .style("opacity", 0)
    
        dot2.transition()
            .duration(2000)
            .delay(function (d, i) { return i * 80 })
            .style('opacity', 0.7);
    
        //툴팁 위치
        var offsetL = document.getElementById('d3_chart').offsetLeft;
        var offsetT = document.getElementById('d3_chart').offsetTop;
        let tooltip = d3.select("#d3_chart").append("div").attr("class", "tooltip").style("opacity", 0);
    
    
        //툴팁
        function tooltip_enter(d) {
            tooltip.style("left", (d3.event.offsetX + offsetL + 15) + 'px')
                .style("top", (d3.event.offsetY + offsetT + 15) + 'px')
                .style("display", "block")
                .style("opacity", 1)
                .html(d.properties.name);
        }
        dot1.on("mouseenter", function (d) {
            d3.select(this).attr("r", 10);
            tooltip_enter(d)
    
        })
            .on("mouseout", function (d) {
                //circle hover
                d3.select(this).attr("r", 5)
                tooltip.style("opacity", 0)
                    .style("display", "none")
            })
    
    
        dot2.on("mouseenter", function (d) {
            d3.select(this).attr("r", 10);
            tooltip_enter(d)
        })
        .on("mouseout", function (d) {
            d3.select(this).attr("r", 5)
            tooltip.style("opacity", 0)
                .style("display", "none")
        })
    
    
    }
    
    function redraw() {
        width = document.getElementById('d3_chart').offsetWidth;
        height = width / 2;
        d3.select('svg').remove();
        setup(width, height);
        draw(topo);
    }
    function move() {
    
        var trans = d3.event.translate;
        var scal = d3.event.scale;
        let zscale = scal;
        var h = height / 4;
    
        trans[0] = Math.min(
            (width / height) * (scal - 1),
            Math.max(width * (1 - scal), trans[0])
        );
    
        trans[1] = Math.min(
            h * (scal - 1) + h * scal,
            Math.max(height * (1 - scal) - h * scal, trans[1])
        );
    
        zoom.translate(trans);
        g.attr("transform", "translate(" + trans + ")scale(" + scal + ")");
    
    }
}


export default map();
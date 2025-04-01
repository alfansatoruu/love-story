"use strict";

var LineSide;
(function (LineSide) {
    LineSide["right"] = "right";
    LineSide["left"] = "left";
})(LineSide || (LineSide = {}));

var Timeline = function () {
    function Timeline(svg, options) {
        var _this = this;
        this.options = options;
        this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.svg = svg;
        this.svg.appendChild(this.path);
        window.onload = function () { return _this.draw(); };
        window.addEventListener("resize", function () { return _this.draw(); });
        this.draw();
    }

    Timeline.fromClass = function (className, startSide, radius) {
        if (startSide === void 0) { startSide = LineSide.left; }
        if (radius === void 0) { radius = 20; }
        var elements = document.getElementsByClassName(className);
        var options = [];
        var evenSide = startSide;
        var oddSide = startSide == LineSide.left ? LineSide.right : LineSide.left;
        for (var i = 0; i < elements.length; i++) {
            var option = {
                element: elements[i],
                side: i % 2 == 0 ? evenSide : oddSide,
                radius: [radius, radius]
            };
            options.push(option);
        }
        return options;
    };

    Timeline.prototype.draw = function () {
        var lastItem;
        var lastPos;
        var path = ["M"];
        
        this.options.forEach(function (item, index) {
            var e = item.element;
            var bbox = {
                x: e.offsetLeft,
                y: e.offsetTop,
                width: e.offsetWidth,
                height: e.offsetHeight
            };
            var pos1 = { x: 0, y: 0 };
            var pos2 = { x: 0, y: 0 };

            switch (item.side) {
                case LineSide.left:
                    pos1.x = bbox.x;
                    pos1.y = bbox.y;
                    pos2.x = bbox.x;
                    pos2.y = bbox.y + bbox.height;
                    break;
                case LineSide.right:
                    pos1.x = bbox.x + bbox.width;
                    pos1.y = bbox.y;
                    pos2.x = bbox.x + bbox.width;
                    pos2.y = bbox.y + bbox.height;
                    break;
            }

            if (index === 0) {
                path.push(pos1.x, pos1.y);
            } else if (lastPos) {
                if (pos1.y === lastPos.y) {
                    if (lastPos.x > pos1.x) {
                        path.push("L", lastPos.x - (lastItem.radius ? lastItem.radius[1] : 0), lastPos.y);
                        path.push("L", pos1.x + (item.radius ? item.radius[0] : 0), pos1.y);
                    } else {
                        path.push("L", lastPos.x + (lastItem.radius ? lastItem.radius[1] : 0), lastPos.y);
                        path.push("L", pos1.x - (item.radius ? item.radius[0] : 0), pos1.y);
                    }
                    // Perbaikan: Kurva kuadratik untuk sudut ke bawah
                    path.push("Q", pos1.x, pos1.y, pos1.x, pos1.y + item.radius[0]);
                } else {
                    path.push("L", pos1.x, pos1.y);
                }
            }

            if (item.radius) {
                if (pos1.y === pos2.y) {
                    path.push("L", pos2.x - item.radius[1], pos1.y);
                    path.push("Q", pos2.x, pos1.y, pos2.x, pos1.y + item.radius[1]);
                } else {
                    path.push("L", pos1.x, pos2.y - item.radius[1]);
                    // Perbaikan: Kurva ke kiri/kanan berdasarkan sisi
                    if (item.side === LineSide.right) {
                        path.push("Q", pos1.x, pos2.y, pos1.x - item.radius[0], pos2.y);
                    } else {
                        path.push("Q", pos1.x, pos2.y, pos1.x + item.radius[0], pos2.y);
                    }
                }
            } else {
                path.push("L", pos2.x, pos2.y);
            }

            lastPos = pos2;
            lastItem = item;
        });

        this.path.setAttribute("d", path.join(" "));
    };

    return Timeline;
}();
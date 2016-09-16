"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var watch = require('node-watch');
var nest_1 = require('./nest');
var Folder = (function (_super) {
    __extends(Folder, _super);
    function Folder(path) {
        this.path = path;
        this.watch();
    }
    Folder.prototype.watch = function () {
        watch(this.path, function (filename) {
            console.log(filename, ' changed.');
            _super.arrive.call(this, this);
        });
    };
    return Folder;
}(nest_1.Nest));
exports.Folder = Folder;

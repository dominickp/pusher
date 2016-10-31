var should = require("chai").should();
var Antfarm = require("./../../lib/antfarm");
var tmp = require('tmp');
var fs = require("fs");
var path = require('path');
//var mock = require('mock-fs');


describe('Tunnels', function() {

    var af, tunnel, tmpobj, tempFileObj;

    var options = {
        log_out_level: "error"
    };

    before("make temporary log directory", function(done){
        tmp.dir({ unsafeCleanup: true }, function(err, dir) {
            if (err) return done(err);
            setTimeout(function(){
                options.log_dir = dir;
                done()
            }, 600);
        });
    });

    beforeEach(function() {
        af = new Antfarm(options);
        tunnel = af.createTunnel("Test tunnel");
        tmpobj = tmp.dirSync();
        tempFileObj = tmp.fileSync();
    });

    afterEach(function() {
        tmpobj.removeCallback();
        tempFileObj.removeCallback();
    });

    after(function(){
       // mock.restore();
    });

    it('should get the tunnel _name', function () {
        tunnel.name.should.equal("Test tunnel");
    });

    it('should add a run callback to the run list', function () {
        tunnel.run(function(){});
        tunnel.getRunList().length.should.equal(1);
    });

    it('should add multiple run callbacks to the run list', function () {
        tunnel.run(function(){});
        tunnel.run(function(){});
        tunnel.run(function(){});
        tunnel.getRunList().length.should.equal(3);
    });

    it('should execute a run callback', function () {
        var myObj = {num: 0};
        var myString = "";
        tunnel.run(function(){
            myObj.num++;
            myString = "Something";
        });
        tunnel.executeRun(); // force run

        myObj.num.should.equal(1);
        myString.should.equal("Something");
    });

    describe('Nests', function() {

        var folder1, folder2;

        var tmpDir;

        beforeEach(function(done) {
            folder1 = af.createFolderNest(tmpobj.name);
            folder2 = af.createFolderNest(tmpobj.name);

            tmp.dir({ unsafeCleanup: true }, function(err, dir) {
                if (err) return done(err);
                tmpDir = dir;
                setTimeout(done, 600);
            });
        });

        it('should be able to watch nests', function() {
            tunnel.watch(folder1);
            tunnel.getNests().length.should.be.equal(1);

            tunnel.watch(folder2);
            tunnel.getNests().length.should.be.equal(2);
        });

        it('should run on a nest arrival when watching', function(done) {
            var tn = af.createTunnel("Watch tunnel");
            tn.watch(af.createFolderNest(tmpDir));

            var obj = {num:0};

            tn.runSync(function(job){
                obj.num++;
                job.name.should.equal("dummy.tmp");
            });

            tn.runSync(function(){
                obj.num.should.equal(1);
            });

            var temp_file_path = tmpDir+"/dummy.tmp";
            fs.writeFileSync(temp_file_path, "Some dummy data.");
            fs.unlinkSync(temp_file_path);

            done();
        });

    });


});

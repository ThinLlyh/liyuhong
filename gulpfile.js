var gulp = require("gulp");

//复制
gulp.task("copy-html",async ()=>{
	//gulp.src("index.html").pipe(gulp.dest("dist"));
	gulp.src("*.html")
	.pipe(gulp.dest("E:\\phpStudy\\WWW\\SKYWORTH"));
});

gulp.task("copy-js",async ()=>{
	gulp.src("js/*.js")
	.pipe(gulp.dest("E:\\phpStudy\\WWW\\SKYWORTH\\js"));
});
gulp.task("copy-css",async ()=>{
	gulp.src("css/*.css")
	.pipe(gulp.dest("E:\\phpStudy\\WWW\\SKYWORTH\\css"));
});
//监听
gulp.task("watchall",async ()=>{
	gulp.watch("*.html",async ()=>{
		gulp.src("*.html").pipe(gulp.dest("E:\\phpStudy\\WWW\\SKYWORTH"));
	});
	gulp.watch("js/*.js",async ()=>{
		gulp.src("js/*.js").pipe(gulp.dest("E:\\phpStudy\\WWW\\SKYWORTH\\js"));
	});
	gulp.watch("img/*.{jpg,png,gif}",async ()=>{
		gulp.src("img/*.{jpg,png,gif}").pipe(gulp.dest("E:\\phpStudy\\WWW\\SKYWORTH\\imgs"));
	});
	gulp.watch("css/*.css",async ()=>{
		gulp.src("css/*.css").pipe(gulp.dest("E:\\phpStudy\\WWW\\SKYWORTH\\css"));
	});
});
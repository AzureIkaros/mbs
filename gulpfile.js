const gulp = require('gulp'); //引入gulp模块
const html = require('gulp-minify-html'); //引入html压缩模块。
const css = require('gulp-minify-css'); //引入css压缩模块。
const sass = require('gulp-sass'); //引入sass编译模块
const uglifyjs = require('gulp-uglify'); //引入js压缩模块
const watch = require('gulp-watch'); //引入监听模块
const babel = require('gulp-babel'); //es6转es5主要模块
const bablecore = require('babel-core'); //es6转es5主要模块
const es2015 = require('babel-preset-es2015'); //es6转es5主要模块
const imagemin = require('gulp-imagemin'); //引入图片压缩模块
const sourcemaps = require('gulp-sourcemaps'); //引入生成.map文件模块
const plugins = require('gulp-load-plugins')(); //生成.map文件



gulp.task('copyfile', function () {
    return gulp.src('src/font/*')
        .pipe(gulp.dest('dist/font/'));
});


gulp.task('uglifyhtml', function () {
    return gulp.src('src/*.html')
        .pipe(html()) //引入压缩模块
        .pipe(gulp.dest('dist/'));
});

gulp.task('uglifycss', function () {
    return gulp.src('src/css/*.css')
        .pipe(css())
        .pipe(gulp.dest('dist/css/'))
 });

gulp.task('compilesass', function () { 
    return gulp.src('src/sass/*.scss')  
        .pipe(plugins.sourcemaps.init()) // 初始化 gulp-sourcemaps 插件  生成.map文件初始化  
        .pipe(plugins.sass({             // 调用 sass 插件，编译 sass 文件
            outputStyle: 'compressed'    //压缩一行
        }))            
        .pipe(plugins.sourcemaps.write('.'))// 生成 sourcemap 生成.map文件 
        .pipe(gulp.dest('dist/css/'));   // 目标文件存放路径
});

//4.压缩js文件--如果将es6的代码转换成es5,无需此模块
// gulp.task('uglifyjs', function () {
//     return gulp.src('src/script/*.js')
//         .pipe(js())
//         .pipe(gulp.dest('dist/script/'));
// });

gulp.task('babel', function () {
    return gulp.src('src/script/*.js')
        .pipe(babel({//es6转es5
            presets: ['es2015']
        }))
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist/script/'));
});

gulp.task('runimg', function () {
    return gulp.src('src/img/*.{png,gif,jpg,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('default',function(){
    watch(['src/font/*','src/*.html','src/css/*.css','src/sass/*.scss','src/script/*.js','src/img/*.{png,jpg,gif,ico}'],gulp.parallel('copyfile','uglifyhtml','uglifycss','compilesass','babel','runimg'));
});


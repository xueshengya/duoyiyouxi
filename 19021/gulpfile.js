const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    gulpsass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect');
// 制定CSS任务
// scss编译成css,压缩css;
gulp.task('css',()=>{
    // 取出sass文件；
    gulp.src('src/css/**/*.scss')
        .pipe(gulpsass())
        .pipe(minify())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})
// 制定HTML任务
gulp.task('html',()=>{
    gulp.src('src/**/*.html')
    .pipe(htmlmin({
        removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})
// 制定JS任务；
gulp.task('js', () =>
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
);
// libs任务
gulp.task('libs',()=>{
    gulp.src('src/libs/**/*')
    .pipe(gulp.dest('dist/libs'))
})
// imgages任务
gulp.task('imgaes',()=>{
    gulp.src('src/imgaes/**/*')
    .pipe(gulp.dest('dist/imgaes'))
})
// 集中执行；
gulp.task('default',["css","html","js","libs","imgaes","server","watch"]);

// 制定监听器
gulp.task('watch',()=>{
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/css/**/*.scss',['css']);
    // gulp.watch('src/imgaes/**/*',['imgaes'])
    gulp.watch('src/js/**/*.js',['js']);
    // gulp.watch('src/js/**/*',['libs'])

})

// 制定开启服务器；
gulp.task('server',()=>{
    connect.server({
        root: 'dist',
        port:1900,
        livereload: true
    });
})
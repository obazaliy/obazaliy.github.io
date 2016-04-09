var gulp = require('gulp');

gulp.task('default', function() {
    var postcss = require('gulp-postcss');

    var processors = [
        // All processors used to make the CSS readable by a browser
        require('postcss-import')({}),
        require('postcss-mixins')({}), //must be set before postcss-simple-vars and postcss-nested.
        require('postcss-nested')({}),
        require('postcss-simple-vars')({}),
        require('postcss-assets')
    ];


    return gulp.src('./css/*.scss')
            .pipe(require('gulp-ext').replace('css'))
            .pipe( postcss(processors) )
            .pipe( gulp.dest('../webapp/resources/css') );
});

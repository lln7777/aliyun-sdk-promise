gulp         = require 'gulp'
coffee       = require("gulp-coffee") # 编译coffee
clean        = require "gulp-clean" # 清除目录或文件

distPath = './dist/';
srcPath = './src/'

# 清除 rev 目标
gulp.task 'clean', ()->
  gulp.src distPath
  .pipe clean()

gulp.task 'copy', ['clean'], ()->
  gulp.src ["./LICENSE", "./*.json", "./*.md" ,"#{srcPath}**/*.json", "#{srcPath}**/*.md", "#{srcPath}**/*.yaml"]
  .pipe gulp.dest distPath

gulp.task 'coffee', ['clean'], ()->
  gulp.src ["#{srcPath}**/*.coffee"]
  .pipe coffee {bare:true}
  .pipe gulp.dest distPath

gulp.task 'default', ['copy', 'coffee']
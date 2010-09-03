def all_javascript_files
  Dir['public/scripts/*.js', 'spec/javascripts/*.js']
end

def run_specs
  system('clear')
  path = "jasmine-node/lib:spec:lib:sampleApp"
  system("env NODE_PATH=#{path} node jasmine-node/specs.js")
end

def jslint_check_all
  result = all_javascript_files.find {|file| !jslint_check(file)}
  puts "JS Lint Checks Complete"
  result
end

def jslint_check(files_to_check)
  puts "Checking #{files_to_check}"
  system("jslint #{files_to_check}")
end

def run_all_tests
  @all_tests_passing = jslint_check_all.nil? && run_specs
end

def check_js(filename)
  system('clear')
  if jslint_check("#{filename}") && run_specs
    run_all_tests unless @all_tests_passing
  else
    @all_tests_passing = false
  end
end

watch('^(lib/(.*)\.js)') { |m| check_js(m[1]) }
watch('^(spec/(.*)\.js)') { |m| check_js(m[1]) }
watch('^(sampleApp/(.*)\.js)') { |m| check_js(m[1]) }

run_specs

# vim:ft=ruby

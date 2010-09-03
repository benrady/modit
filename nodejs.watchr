def run_specs
  system('clear')
  path = "jasmine-node/lib:spec:lib:sampleApp"
  system("env NODE_PATH=#{path} node jasmine-node/specs.js")
end

watch('^(lib/(.*)\.js)') { |m| run_specs }
watch('^(spec/(.*)\.js)') { |m| run_specs }
watch('^(sampleApp/(.*)\.js)') { |m| run_specs }

run_specs

# vim:ft=ruby

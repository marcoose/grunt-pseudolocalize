# grunt-pseudolocalize

> Reads an English JSON file and pseudolocalizes a value from each property key into an extended Unicode representation that resembles English for localization testing.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pseudolocalize --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pseudolocalize');
```

## The "pseudolocalize" task

### Overview
In your project's Gruntfile, add a section named `pseudolocalize` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pseudolocalize: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
})
```

### Options

#### options.pretty
Type: `Boolean`
Default value: `true`

Whether or not the output JSON file should be "pretty-printed" with indentation and multiple lines, or simply stringified into a single line.

#### options.pad
Type: `Float`
Default value: `0.0`

A percentage in decimal (between 0.0 and 1.0) to increase input string length by adding 'x' characters to end of string.  Used to inflate length of values as many languages use more characters than English when translated.

#### options.key
Type: `String`
Default value: undefined

The name of the key within the 'value' object in a nested JSON file to translate, if required.  e.g.
this setting is not needed for a "flat" structure:
{
  "key": "value"
}  

but a setting of 'message.text' might be used for a "deeper" structure:
{
  "key": {
  	"message": {
	  	"text": "value to pseudolocalize",
	  	"description": "left alone"
	  },
	"metadata": "stuff"
  } 
}

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  pseudolocalize: {
    files: {
      'dest/messages_pseudo.json': ['src/locale/messages_en.json']
    }
  }
})
```

#### Custom Options

```js
grunt.initConfig({
  pseudolocalize: {
    options: {
      pretty: false,
      key: 'message',
      pad: 0.3
    },
    files: {
      'dest/msg_pseudo.json': ['messages/main_en.json', 'messages/supplemental_en.json']
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* v0.1.1 - updated dependencies
* v0.1.0 - initial version

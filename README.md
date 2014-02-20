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

#### options.padPercent
Type: `Number`
Default value: `0.0`

A percentage in decimal (between 0.0 and 1.0) to increase input string length by adding characters to end of string.  Used to inflate length of values as many languages use more characters than English when translated.

For example, a value of 0.3 would make strings 30% longer &mdash; a 10 character string would be pseudolocalized and then have 3 characters appended (10 * 0.3 = 3).

The padding characters come from repeating sequences of `options.padString` until the required number of characters is produced.  

#### options.padString
Type: `String`
Default value: `x`

A string of one or more characters to be repeated at the end of values requiring padding.  Only used when `options.pad` is greater than 0.

#### options.prefix
Type: `String`
Default value: `''`

A string to be added to the beginning of each pseudolocalized value.  The `options.padPercent` calculation does not take this additional length into account.

#### options.suffix
Type: `String`
Default value: `''`

A string to be added to the end of each pseudolocalized value.  The `options.padPercent` calculation does not take this additional length into account.

#### options.splitRegex
Type: `String`
Default value: `undefined`

An optional string that will be used to create a new RegExp() applied to the input value.  The input value will be .split by this regex, and any matching parts will not be pseudolocalized.  This is useful to prevent tampering with variables or other not-to-be-translated parts in a message catalog.

*e.g. to ignore handlebar variables use the string* `{{\\w+}}` * &mdash; for an input value of `translate me {{but not me}}`, the `{{but not me}}` will be left untouched*

#### options.key
Type: `String`
Default value: `undefined`

The name of the key within the 'value' object in a nested JSON file to translate, if required.  
This setting is not needed for a "flat" structure:
```js
{
  "key": "value"
}
```  

but a setting of 'message.text' might be used for a "deeper" structure:
```js
{
  "key": {
  	"message": {
	  	"text": "value to pseudolocalize",
	  	"description": "left alone"
	  },
	"metadata": "stuff"
  } 
}
```

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

```js
grunt.initConfig({
  pseudolocalize: {
    options: {
      pretty: true,
      prefix: '[',
      suffix: ']',
      padString: '!pseudo',
      padPercent: 0.25,
      splitRegex: '{{\\w+}}' // need to escape the backslash in regex
    },
    files: [{
      		src: 'i18n/*_*.json',
      		dest: 'msgs_ps.json'
    	}]
  }
})
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* v0.2.0
  - replaced 'pad/padChar' with 'padPercent/padString'
  - added split regex option to preserve variables
  - added prefix/suffix options 
* v0.1.3 - made 'padChar' configurable
* v0.1.2 - updated dependencies
* v0.1.0 - initial version

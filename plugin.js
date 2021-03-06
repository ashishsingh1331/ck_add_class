/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
CKEDITOR.plugins.add('ckeditor_add_class', {
    icons: 'ckeditor_add_class',
    init: function (editor) {
        var config = editor.config;
        editor.ui.addRichCombo('ckeditor_add_class', {
            label: 'Add Class',
            title: 'Add classes',
            toolbar: 'basicstyles,0',

            panel: {
                css: [CKEDITOR.skin.getPath('editor')].concat(config.contentsCss),
                multiSelect: false,
                attributes: { 'aria-label': 'Add classes' }
            },
            onRender: function () {
                editor.on('selectionChange', function (ev) {
                    var elementPath = ev.data.path,
                        elements = elementPath.elements;
                        var ck_add_class_styles = config.hasOwnProperty('ck_add_class_styles') ? config.ck_add_class_styles : [];
                        var classesObj = {};
                        ck_add_class_styles.forEach(function (value, index, array) {
                            classesObj[value.element] = value.name;
                        });

                    // For each element into the elements path.
                    for (var i = 0, count = elements.length, element; i < count; i++) {
                        element = elements[i];

                        // Check if the element has class
                        for (var key in classesObj) {
                            if (element.hasClass(key)) {
                                this.setValue(key, classesObj[key]);
                            }
                        }

                    }
                }, this);
            },
            init: function () {
                var ck_add_class_styles = config.hasOwnProperty('ck_add_class_styles') ? config.ck_add_class_styles : [];
                var that = this;
                ck_add_class_styles.forEach(function (value, index, array) {
                    that.add(value.element, value.name);
                });
            },
            onClick: function (value) {
                var ck_add_class_styles = config.hasOwnProperty('ck_add_class_styles') ? config.ck_add_class_styles : [];
                var classes = [];
                var classesObj = {};
                ck_add_class_styles.forEach(function (value, index, array) {
                    classes.push(value.element, value.name);
                    classesObj[value.element] = value.name;
                });
                var element = editor.getSelection().getStartElement();

                classes.forEach(function (value, index, array) {
                    if (element.hasClass(value)) {
                        element.removeClass(value);
                    }
                });
                element.addClass(value);
                this.setValue(value, classesObj[value]);
            }
        });
    }
});

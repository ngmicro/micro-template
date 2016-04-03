(function () {
    'use strict';

    // Creating MicroTemplate module and service.
    angular.module('MicroTemplate', [])
        .service('MicroTemplate', MicroTemplateService);

    // Create NGMicro object to window if not defined.
    if ( !window.NGMicro ) window.NGMicro = {};

    // Assign Template Service to NGMicro.
    NGMicro.template = MicroTemplate;

    // Create Template Libraries
    var TemplateLibraries = {};

    // Get the template libraries script.
    var templateScripts = document.querySelectorAll('[type="text/html+micro-template"]');

    Object.keys(templateScripts).forEach(function ( i ) {
        // Get the template script.
        var script = templateScripts[ i ];

        // Ensure some templates exist on the script.
        if ( script.innerHTML.search('micro-template') > -1 ) {
            parseTemplate(script.innerHTML);
        }

        // Remove the source script if nokeep attribute is given.
        if ( script.hasAttribute('nokeep') ) script.remove();
    });

    // Template Parser
    function parseTemplate ( content ) {
        // Create template wrapper.
        var wrapper = document.createElement('div');

        // Insert templates to the wrapper.
        wrapper.innerHTML = content;

        // Get the inserted templates.
        var templates = wrapper.querySelectorAll('micro-template, [micro-template]');

        Object.keys(templates).forEach(function ( i ) {
            // Get the template.
            var template = templates[ i ];

            // Get template name.
            var id = template.getAttribute('id');

            // Add to libraries if template id is defined.
            if ( 'string' === typeof id && id !== '' ) {
                TemplateLibraries[ id ] = template.innerHTML;
            }
        });
    }

    // MicroTemplate Factory.
    function MicroTemplateService ( $http ) {
        return MicroTemplate;
    }

    // Template Service.
    function MicroTemplate ( id ) {
        var template;

        if ( TemplateLibraries[ id ] ) {
            template = TemplateLibraries[ id ];
        }
        else {
            template = '';
        }

        return template;
    }
})();
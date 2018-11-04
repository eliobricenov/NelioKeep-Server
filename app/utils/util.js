const arrange =  ( data, sort_by, storeIn, fields ) => {
    let indexs = [],
        content = [];
    data.forEach( element => {
        let container,
            item = {},
            index = indexs.indexOf( element[sort_by] );
        if ( index < 0 ) {
            indexs.push( element[sort_by] );
            content.push( element );
            container = element;
            container[storeIn] = [];
        } else {
            container = content[index];
        }
        fields.forEach( key => {
            item[key] = element[key];
        } );

        container[storeIn].push(item);

        if (index < 0) {
            fields.forEach( key => delete container[key] );
        }
    } );
    return content;
};


module.exports = { arrange };
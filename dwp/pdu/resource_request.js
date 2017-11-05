////////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
////////////////////////////////////////////////

const factory = require( '../factory' )
var extend = require( 'util' )._extend

var validate = function ( object ) {
}

var format = function ( data ) {

   validate( data );

   var object = extend( {}, { Id: factory.Id.ResourceRequest });

   if ( data !== undefined ) {
      object = extend( object, data );
   }

   var packet = JSON.stringify( object );

   return factory.encapsulate( packet );
}


module.exports = {
   validate: validate,
   format: format
}
////////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
////////////////////////////////////////////////

const factory = require( '../factory' )
const extend = require( 'util' )._extend

var validate = function validate( object ) {

   if ( object === undefined ) throw 'Object is undefined';

   var err = { 'Result': false, 'Message': '' };

   if ( object.memory === undefined ) {
      err.Result = true;
      err.Message += 'memory ';
   }

   if ( object.cpu === undefined ) {
      err.Result = true;
      err.Message += 'cpu ';
   }

   if ( err.Result ) throw err.Message + 'undefined';
}

var format = function format( data ) {

   validate( data );

   var object = extend( {}, { Id: factory.Id.ResourceResponse });
   object = extend( object, data );

   var packet = JSON.stringify( object );

   return factory.encapsulate( packet );
}

module.exports = {
   validate: validate,
   format: format
}
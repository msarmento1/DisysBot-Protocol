////////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
////////////////////////////////////////////////

const factory = require( '../factory' )
const extend = require( 'util' )._extend

const Command = {
   Pause: 0,
   Resume: 1,
   Stop: 2,
};

var validate = function validate( data ) {

   if ( data === undefined ) {
      throw 'Object is undefined';
   }

   var err = { 'result': false, 'message': '' };

   if ( data.command === undefined ) {
      err.result = true;
      err.message += 'Command ';
   }

   if ( err.result ) {
      throw err.message + 'undefined';
   }
}

var format = function format( data ) {

   validate( data );

   var object = extend( {}, { Id: factory.Id.ControlCommand } );
   object = extend( object, data );

   var packet = JSON.stringify( object );

   return factory.encapsulate( packet );
}

module.exports = {
   validate: validate,
   format: format,
   Command: Command,
}
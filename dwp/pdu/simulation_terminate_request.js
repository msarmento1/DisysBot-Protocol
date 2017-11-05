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

   if ( object.SimulationId === undefined ) {
      err.Result = true;
      err.Message += 'SimulationId ';
   }

   if ( err.Result ) throw err.Message + 'undefined';
}

var format = function format( data ) {

   validate( data );

   var object = extend( {}, { Id: factory.Id.SimulationTerminateRequest });
   object = extend( object, data );

   var packet = JSON.stringify( object );

   return factory.encapsulate( packet );
}

module.exports = {
   validate: validate,
   format: format
}
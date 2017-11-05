////////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
////////////////////////////////////////////////

const factory = require( '../factory' )
const extend = require( 'util' )._extend

const Result = {
   Success: 0,
   Failure: 1,
};

var validate = function validate( data ) {

   if ( data === undefined ) throw 'Object is undefined';

   var err = { 'Result': false, 'Message': '' };

   if ( data.Result === undefined ) {
      err.Result = true;
      err.Message += 'Result ';
   }

   if ( data.SimulationId === undefined ) {
      err.Result = true;
      err.Message += 'SimulationId ';
   }

   if ( err.Result ) throw err.Message + 'undefined';
}

var format = function format( data ) {

   validate( data );

   var object = extend( {}, { Id: factory.Id.SimulationResponse });
   object = extend( object, data );

   var packet = JSON.stringify( object );

   return factory.encapsulate( packet );
}

module.exports = {
   validate: validate,
   format: format,
   Result: Result,
}
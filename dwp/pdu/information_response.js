////////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
////////////////////////////////////////////////

const factory = require( '../factory' )
const extend = require( 'util' )._extend

var validate = function validate( object ) {

   if ( data === undefined ) {
      throw 'Object is undefined';
   }

   var err = { 'result': false, 'message': '' };

   if ( data.executingSimulationInstances === undefined ) {
      throw 'executingSimulationInstances undefined';
   }

   if ( data.executingSimulationInstances.id === undefined ) {
      err.result = true;
      err.message += 'executingSimulationInstances.id ';
   }

   if ( data.executingSimulationInstances.startTime === undefined ) {
      err.result = true;
      err.message += 'executingSimulationInstances.startTime ';
   }

   if ( err.result ) {
      throw err.message + 'undefined';
   }
}

var format = function format( data ) {

   validate( data );

   var object = extend( {}, { Id: factory.Id.InformationResponse } );
   object = extend( object, data );

   var packet = JSON.stringify( object );

   return factory.encapsulate( packet );
}

module.exports = {
   validate: validate,
   format: format
}
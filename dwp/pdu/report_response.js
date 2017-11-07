////////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
////////////////////////////////////////////////

const factory = require( '../factory' )
const extend = require( 'util' )._extend

var validate = function validate( object ) {

}

var format = function format( data ) {

   validate( data );

   var object = extend( {}, { Id: factory.Id.ReportResponse } );
   object = extend( object, data );

   var packet = JSON.stringify( object );

   return factory.encapsulate( packet );
}

module.exports = {
   validate: validate,
   format: format
}
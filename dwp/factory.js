////////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
////////////////////////////////////////////////

const resource_request = require( './pdu/resource_request' );
const resource_response = require( './pdu/resource_response' );
const simulation_request = require( './pdu/simulation_request' );
const simulation_response = require( './pdu/simulation_response' );
const simulation_terminate_request = require( './pdu/simulation_terminate_request' );

const Id = {
   ResourceRequest: 0,
   ResourceResponse: 1,
   SimulationRequest: 2,
   SimulationResponse: 3,
   SimulationTerminateRequest: 4,
}

module.exports.Id = Id;

module.exports.validate = function ( object ) {

   if ( object['Id'] === undefined ) {
      throw 'Id undefined';
   }

   switch ( object['Id'] ) {

      case Id.ResourceRequest:
         resource_request.validate( object );
         break;

      case Id.ResourceResponse:
         resource_response.validate( object );
         break;

      case Id.SimulationRequest:
         simulation_request.validate( object );
         break;

      case Id.SimulationResponse:
         simulation_response.validate( object );
         break;

      case Id.SimulationTerminateRequest:
         simulation_terminate_request.validate( object );
         break;

      default:
         throw 'Invalid Id';
   }

}

const beginTag = '/BEGIN/';
const endTag = '/END/';

module.exports.encapsulate = function ( packet ) {

   return beginTag + packet + endTag;
}

module.exports.expose = function ( packet ) {

   var beginIndex = packet.search( beginTag );

   if ( beginIndex === -1 ) {
      throw 'Begin tag not found';
   }

   var endIndex = packet.search( endTag, beginIndex );

   if ( endIndex === -1 ) {
      throw 'End tag not found';
   }

   return packet.substring( beginIndex + beginTag.length, endIndex );
}

/*
   Removes first occurrence of DWP packet
*/
module.exports.remove = function ( packet ) {

   var beginIndex = packet.search( beginTag );

   if ( beginIndex === -1 ) {
      throw 'Begin tag not found';
   }

   var endIndex = packet.search( endTag, beginIndex );

   if ( endIndex === -1 ) {
      throw 'End tag not found';
   }

   return packet.replace( packet.substring( beginIndex, endIndex + endTag.length ), '' );
}
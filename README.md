# Dispatcher-Worker Protocol (DWP)

Communication protocol between [dispatcher](https://github.com/MatheusMS01/web_dispatcher) and [worker](https://github.com/MatheusMS01/worker).
It is an application layer protocol responsible for exchanging messages, transmitting commands and configurations between a dispatcher and a worker machine. It is independent of an specific transmition subsystem, requiring a transmission channel that guarantees reliability and data integrity. The protocol data unities (PDU) are formatted via JSON and encapsulated by two marks indicating respectively the beginning and end of the packet. To each PDU is assigned a unique numerical identifier, ensuring that they are distinguished at the time of analysis of the package by one of the treatment ends.

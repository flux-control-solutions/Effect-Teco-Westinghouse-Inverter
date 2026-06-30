
![](documentation/pdf_references/A510_comm_addendum.pdf-0001-00.png)


**----- Start of picture text -----**<br>
TEC@ @westinghouse<br>INVERTER<br>——<br>rae was vo mar wie REF e<br>A510 TECO= Westinghouse<br>a)<br>Communication - Addendum<br>1,<br>4 tee, ais<br>ad ;o =<br>**----- End of picture text -----**<br>


casi Modbus RTU / ASCII 

B® Profibus 

**DOCUMENT - TECO-A510-AC001 Ver 01: 2015.04** 

## **Table of Contents** 

**1.0 Modbus Protocol Description ............................................................................................. 1-1** 1.0.1 Communication Connection and Data Frame .............................................................................. 1-1 1.0.2 Register and Data Format ............................................................................................................ 1-5 1.0.3 Parameter Data .......................................................................................................................... 1-14 **1.1 Profibus Communication Option Card ............................................................................. 1-25** 1.1.1 Introduction ................................................................................................................................. 1-25 1.1.2 Specifications ............................................................................................................................. 1-25 1.1.3 Wiring Diagram ........................................................................................................................... 1-26 1.1.4 Installation .................................................................................................................................. 1-26 1.1.5 Descriptions of Terminals, LEDs and DIP Switch ...................................................................... 1-29 1.1.6 Related Parameters for Communication .................................................................................... 1-30 1.1.7 Profibus I/O List .......................................................................................................................... 1-30 1.1.8 Error Message ............................................................................................................................ 1-34 1.1.9 GSD File ..................................................................................................................................... 1-34 **Appendix A: Communication Networks .................................................................................................... A-1** A1.1 RS485 Network (Modbus) .......................................................................................................... A-1 

1-0 

## **1.0 Modbus Protocol Descriptions** 

## **1.0.1 Communication Connection and Data Frame** 

The inverter can communicate with a PC or PLC via RS485 or RS232 using the Modbus RTU or Modbus ACSII protocol. The maximum frame length is 80 bytes. 

## **Network Connection** 


![](documentation/pdf_references/A510_comm_addendum.pdf-0003-04.png)


**----- Start of picture text -----**<br>
A510  A510  A510  A510<br>Controller<br>Node   Node   Node   Node<br> (PLC / HMI or<br>Address 01  Address 02  Address 03  Address FE<br>PC)<br>CN6  CN6  CN6  CN6<br>RS-485  S(+)  S(-)  S(+)  S(-)  S(+)  S(-)  S(+)  S(-)<br>Interface<br>120Ω  120Ω<br>1/4w  1/4w<br>** Terminate the communications line with a (120 ohm, 1/4 watt) resistor at both ends.<br>CN6 Pin out<br>PIN  Signal  PIN  Signal<br>1  RS-485 S+ signal  5  Tx signal<br>8 7 6 5 4 3 2 1<br>2  RS-485 S- signal  6  RS-485 S- signal<br>VCC of isolated 5V<br>3  RS-485 S+ signal  7<br>power supply<br>GND of isolated 5V<br>4  Rx signal  8<br>power supply<br>**----- End of picture text -----**<br>


For RS-485 communication use pin 1 or pin 3 for S (+) and pin 2 or pin 6 for S (-) 

1-1 

**Data Format Frame** 

## **Data Frame for ASCII Mode** 

|STX(3AH)|StartBit=3AH|
|---|---|
|NodeAddressHi|Communication Address(Station):<br>2-digitASCIICode|
|Node Address Lo||
|Function Hi|Function Code (command):<br>2-digitASCIICode|
|Function Lo||
|Command Start Address|Command Start byte:<br>4-digit ASCII Code|
|Command Start Address||
|Command Start Address||
|Command StartAddress||
|Data length|The length of the command:<br>4-digit ASCII Code|
|Data length||
|Datalength||
|Datalength||
|LRC Check Hi|LRC Check Code:<br>2-digitASCIICode|
|LRC Check Lo||
|END Hi|End  Byte:<br>END  Hi=CR(0DH),END Li = LF(0AH)|
|END Lo||



## **Data Frame for RTU Mode** 

Master (PLC etc.) sends request to follower (inverter), and the follower sends a response to the master (PC, PLC). The data received is illustrated here. 

The data length varies depending on the command (Function). 

Node Address Function Code DATA CRC CHECK Signal Interval 

** The inverter response time is 10ms. 

## **Node Address** 

00H: Broadcast to all the drivers 01H: to the No. 01 inverter 0FH: to the No.15 inverter 10H: to the No.16 inverter and so on...., max to No. 254 (FEH) 

## **Function Code** 

03H: Read the register contents 

1-2 

06H: Write a WORD to register 08H: Loop test 

10H: Write several data to register (complex number register write) 

## **Checksum Calculation** 

**LRC** ex.  NODE ADDRESS 01H FUNCTION 03H COMMAND 01H 00H + DATA LENGTH 0AH -----------------------------------------0FH ------------ 2’s complement Checksum F1H CS (H) 46H (ASCII) CS (L)   = 31H (ASCII) 

## **CRC** 

CRC Check: CRC code covers the content from node address to DATA. Please calculate it according to the following methods. 

- (1) Load a 16-bit register with FFFF hex (all1’s). Call this CRC register. 

- (2) Exclusive OR the first 8-bit byte of the message, the low-order byte of the 16-bit CRC register, putting the result in the CRC register. 

- (3) Shift the CRC register one bit to the right (toward the LSB), Zero-filling the MSB, Extract and examines the LSB. 

- (4) (If the LSB was 0): Repeat Steps (3) (another shift) 

   - (If the LSB was 1): Exclusive OR the CRC register with the polynomial value A001 hex (1010 0000 0000 0001), putting the result in CRC register. 

- (5) Repeat Steps (3) and (4) until 8 shifts been performed. When this is done, a complete 8-bit byte will be processed. 

- (6) Repeat Steps (2) through (5) for next 8-bit byte of the message, Continue doing this until all bytes have been processed. The final content in the CRC register is the CRC value. When sending the CRC value, the Low-order byte should be sent firstly, then the High-order byte. For example, CRC value: 1241 Hex, the high-order byte should be set to 41hex and low-order byte 12hex. 

1-3 

**CRC calculate program (C language):** 

UWORD ch_sum (UBYTE long, UBYTE *rxdbuff ) { BYTE i = 0; UWORD wkg = 0xFFFF; while ( long-- ) { wkg ^= rxdbuff++; for ( i = 0 ; i < 8; i++ ) { if ( wkg & 0x0001 ) { wkg = ( wkg >> 1 ) ^ 0xa001; } else { wkg = wkg >> 1; } } } return( wkg ); } 

|**ASCII Mode**|**ASCII Mode**||**RTU Mode**|**RTU Mode**|**RTU Mode**|
|---|---|---|---|---|---|
|STX|‘:’||NodeAddress||02H|
|Address|‘0’||Function||83H|
||‘1’||Exceptioncode||52H|
|Function|‘8’||CRC-16|High|C0H|
||‘6’|||Low|CDH|
|Exception<br>code|‘5’|||||
||‘1’|||||
|LRC Check|‘2’|||||
||‘8’|||||
|END|‘CR’|||||
||‘LF’|||||



During a communication error the drive will response with an Exception Code and send a message back to the main system consisting of a Function Code that is “ANDED (and 80h)” with 80 Hex. 

|**Exception code**|**Content**|
|---|---|
|01|Functioncode error|
|02|Register numbererror|
|03|DATAsetting error|
|04|Register number is over32|



1-4 

## **1.0.2 Register and Data Format** 

## **Command Data (Read / Write)** 

|**Register No. **|||**Bit**|**Bit**|**Content**|
|---|---|---|---|---|---|
|2500H||Reserved||||
|2501H||Operation Signal|0|Operation  Command<br>1 : Run<br>0 : Stop||
||||1|Reverse Command<br>1 : Reverse<br>0 : Forward||
||||2|External Fault<br>1 : Fault||
||||3|Fault Reset<br>1 : Reset||
||||4|Reserved||
||||5|Reserved||
||||6|Multi-function Comm S1<br>1 :“ON”||
||||7|Multi-functionCommS2<br>1 :“ON”||
||||8|Multi-functionCommS3<br>1 :“ON”||
||||9|Multi-functionCommS4<br>1 :“ON”||
||||A|Multi-functionCommS5<br>1 :“ON”||
||||B|Multi-function Comm S6<br>1 :“ON”||
||||C|Multi-function Comm S7<br>1 :“ON”||
||||D|Multi-functionCommS8<br>1 :“ON”||
||||E|Inverter mode<br>1 : “ON”||
||||F|Torque Command set by Communication  1: “ON”||
|2502H|||*Frequency Command (Unit:0.01Hz)|||
|2503H|||Torque Command (+/-8192 corresponding to the rated torque +/-100%)|||
|2504H|||Speed limit (+/-120 corresponding +/-120%)|||
|2505H|||AO1(0.00V ~ 10.00V)|||
|2506H|||AO2 (0 ~ 1000): Voltage (corresponding to 0.00~10.00V); Current (<br>corresponding to4mA~20mA)|||
|2507H|||DO|||
|2508H|||Reserved|||
|2509H|||Reserved|||
|250AH|||Reserved|||
|250BH|||Reserved|||
|250CH|||Reserved|||
|250DH|||Reserved|||
|250EH|||Reserved|||
|250FH|||Reserved|||
|2510H|||G12-00H-WORD|||
|2511H|||G12-00L-WORD|||



**Note:** Write a zero into the register for not used bit; do not write data to a reserved register. 

**** If the maximum output frequency of the motor is over 300Hz the frequency resolution is 0.1Hz** 

1-5 

**Monitor Data (Read-only)** 

|**Register No. **|||**Bit**||**Content**|**Content**|
|---|---|---|---|---|---|---|
|2520H||State  Signal|0|Operation||1 : Run<br>0 : Stop|
||||1|Direction||1 : Reverse<br>0 : Forward|
||||2|Inverter ready||1 : ready<br>0 : Not ready|
||||3|Fault||1 : Abnormal|
||||4|Warning||1 :“ON”|
||||5|Zero Speed||1 :“ON”|
||||6|Is440V||1 :“ON”|
||||7|Frequency Agree||1 :“ON”|
||||8|SetFrequencyAgree||1 :“ON”|
||||9|FrequencyDetection 1||1 :“ON”|
||||A|FrequencyDetection 2||1 :“ON”|
||||B|Under Voltage||1 :“ON”|
||||C|Baseblock||1 :“ON”|
||||D|Freq Ref. not from Comm.||1 :“ON”|
||||E|Seq. notfromComm.||1 :“ON”|
||||F|Over Torque||1 :“ON”|
||||||||
|2521H||Error Description|0||30||
||||1|UV|31||
||||2|OC|32||
||||3|OV|33||
||||4|OH1|34||
||||5|OL1|35||
||||6|OL2|36||
||||7|OT|37||
||||8|UT|38|CF07|
||||9|SC|39||
||||10|Ground OC|40||
||||11|Fuse broken|41|OLDOP|
||||12|InputPhaseLoss|42||
||||13|Output Phase Loss|43||
||||14|PG Overspeed|44||
||||15|PG Open|45||
||||16|PG SpeedDeviation|46||
||||17|External Fault 01|47|SS1|
||||18|External Fault 02|48|CF20|
||||19|External Fault 03|49|RUN|
||||20|External Fault 04|50||
||||21|External Fault 05|51||
||||22|External Fault 06|52||
||||23|External Fault 07|53||
||||24|External Fault 08|54||
||||25|FB|55||
||||26|OPR|56||



1-6 

||||27|27||||57|57||||
|---|---|---|---|---|---|---|---|---|---|---|---|---|
||||28||CE|||58|||||
||||29||STO|||59|||||
||||30||Over Torque 2|||61|||||
||||||||||||||
|2522H||DI State|0||TerminalS1||||||||
||||1||TerminalS2||||||||
||||2||TerminalS3||||||||
||||3||TerminalS4||||||||
||||4||Terminal S5||||||||
||||5||Terminal S6||||||||
||||6||TerminalS7||||||||
||||7||TerminalS8||||||||
||||8||Reserved||||||||
||||9||Reserved||||||||
||||A||Reserved||||||||
||||B||Reserved||||||||
||||C||Reserved||||||||
||||D||Reserved||||||||
||||E||Reserved||||||||
||||F||Reserved||||||||
||||||||||||||
|2523H|||||||Frequency command (0.01Hz)||||||
|2524H|||||||Outputfrequency (0.01Hz)||||||
|2525H|||||||Reserved||||||
|2526H|||||||DCvoltage command (0.1V)||||||
|2527H|||||||Output current (0.1A)||||||
|2528H||Warning Description|0|No alarm||20|EF4|40|EF||60|Reserved|
||||1|OV||21|EF5|41|Reserved||61|RETRY|
||||2|UV||22|EF6|42|Reserved||62|SE07|
||||3|OL2||23|EF7|43|RDP||63|SE08|
||||4|OH2||24|EF8|44|Reserved||64|Reserved|
||||5|Reserved||25|Reserved|45|OL1||65|OH1|
||||6|OT||26|CLB|46|HP_ER||66|FIRE|
||||7|Reserved||27|Reserved|47|SE10||67|ES|
||||8|Reserved||28|CT|48|保留||68|STP1|
||||9|UT||29|USP|49|BB1||69|BDERR|
||||10|OS||30|RDE|50|BB2||70|EPERR|
||||11|PGO||31|WRE|51|BB3||71|<br>ADCER|
||||12|DEV||32|FB|52|BB4||72|Reserved|
||||13|CE||33|VRYE|53|BB5||73|STP0|
||||14|CALL||34|SE01|54|BB6||74|ENC|
||||15|Reserved||35|SE02|55|BB7||75|STP2|
||||16|EF0||36|SE03|56|BB8||||
||||17|EF1||37|Reserved|57|Reserved||||
||||18|EF2||38|SE05|58|Reserved||||
||||19|EF3||39|HPERR|59|Reserved||||



1-7 

|2529H|||DigitalOutput State|
|---|---|---|---|
|252AH|||AO1(0.00V ~ 10.00V)|
|252BH|||AO2 (0 ~ 1000): Voltage (corresponding to 0.00~10.00V); Current<br>(corresponding to 4mA~20mA)|
|252CH|||AnalogInput1(0.1%)|
|252DH|||AnalogInput2(0.1%)|
|252EH|||Reserved|
|252FH|||A510 Check|



**Note:** Write a zero into the register for not used bit; do not write data to a reserved register. 

*** If the maximum output frequency of the motor is over 300Hz, the frequency resolution is 0.1Hz** 

1-8 

**Read Holding Register [03H]** 

Read consecutive holding registers. The address of the first holding register is specified in the protocol Example: Read frequency command from the inverter with node address 1. 

## **ASCII Mode** 

|**Command Message             Respo**<br>3AH<br>STX<br>30H<br>Node Address<br>31H<br>30H<br>Function<br>33H<br>30H<br>Starting<br>Register<br>31H<br>32H<br>33H<br>30H<br>Number of<br>Registers<br>30H<br>30H<br>31H<br>?<br>LRC CHECK<br>?<br>0DH<br>END<br>0AH|**Command Message             Respo**<br>3AH<br>STX<br>30H<br>Node Address<br>31H<br>30H<br>Function<br>33H<br>30H<br>Starting<br>Register<br>31H<br>32H<br>33H<br>30H<br>Number of<br>Registers<br>30H<br>30H<br>31H<br>?<br>LRC CHECK<br>?<br>0DH<br>END<br>0AH|**nse Message (Normal)       Response**<br>3AH<br>STX<br>30H<br>Node Address<br>31H<br>30H<br>Function<br>33H<br>30H<br>Data Length<br>32H<br>31H<br>Initial Save<br>Register<br>37H<br>37H<br>30H<br>?<br>LRC CHECK<br>?<br>0DH<br>END<br>0AH|**Message (Error)**|**Message (Error)**|
|---|---|---|---|---|
|3AH|STX||3AH|STX|
|30H|Node Address||30H|Node Address|
|31H|||31H||
|30H|Function||38H|Function|
|33H|||33H||
|30H|Starting<br>Register||30H|Exception code|
|31H|||34H||
|32H|||34H|LRC CHECK|
|33H|||30H||
|30H|Number of<br>Registers||0DH|END|
|30H|||0AH||
|30H|||||
|31H|||||
|?|LRC CHECK||||
|?|||||
|0DH|END||||
|0AH|||||



## **RTU Mode** 

|**Command Message             Respo**<br>NodeAddress<br>01 H<br>Function<br>03H<br>Starting<br>Register<br>High<br>0CH<br>Low<br>10H<br>Number of<br>Registers<br>High<br>00H<br>Low<br>01H<br>CRC-16<br>High<br>86H<br>Low<br>9FH|**Command Message             Respo**<br>NodeAddress<br>01 H<br>Function<br>03H<br>Starting<br>Register<br>High<br>0CH<br>Low<br>10H<br>Number of<br>Registers<br>High<br>00H<br>Low<br>01H<br>CRC-16<br>High<br>86H<br>Low<br>9FH|**Command Message             Respo**<br>NodeAddress<br>01 H<br>Function<br>03H<br>Starting<br>Register<br>High<br>0CH<br>Low<br>10H<br>Number of<br>Registers<br>High<br>00H<br>Low<br>01H<br>CRC-16<br>High<br>86H<br>Low<br>9FH|**nse Message (Normal)     Respons**<br>NodeAddress<br>01H<br>Function<br>03H<br>Data Length<br>02H<br>Initial<br>Save<br>Register<br>High<br>17H<br>Low<br>70H<br>CRC-16<br>High<br>B6H<br>Low<br>50H|**nse Message (Normal)     Respons**<br>NodeAddress<br>01H<br>Function<br>03H<br>Data Length<br>02H<br>Initial<br>Save<br>Register<br>High<br>17H<br>Low<br>70H<br>CRC-16<br>High<br>B6H<br>Low<br>50H|**nse Message (Normal)     Respons**<br>NodeAddress<br>01H<br>Function<br>03H<br>Data Length<br>02H<br>Initial<br>Save<br>Register<br>High<br>17H<br>Low<br>70H<br>CRC-16<br>High<br>B6H<br>Low<br>50H|**e Message (Error)**|**e Message (Error)**|**e Message (Error)**|
|---|---|---|---|---|---|---|---|---|
|NodeAddress||01 H|NodeAddress||01H|NodeAddress||01H|
|Function||03H|Function||03H|Function||83H|
|Starting<br>Register|High|0CH|Data Length||02H|Exception code||04H|
||Low|10H|Initial<br>Save<br>Register|High|17H|CRC-16|<br>High<br>Low|40H|
|Number of<br>Registers|High|00H||Low|70H|||F3H|
||Low|01H|CRC-16|High|B6H||||
|CRC-16|High|86H||Low|50H||||
||Low|9FH|||||||



1-9 

**Loop back test [08H]** 

Check the communication between the master and the follower (inverter). The data used can be arbitrary. 

## **ASCII Mode** 

|**Command Message**|**Command Message**|**Response Message (Normal)**|**Response Message (Normal)**|**Response Message (Normal)**|**Response Message (Error)**|**Response Message (Error)**|**Response Message (Error)**|
|---|---|---|---|---|---|---|---|
|3AH|STX||3AH|STX||3AH|STX|
|30H<br>31H|Node Address||30H<br>31H|Node Address||30H<br>31H|Node Address|
|30H<br>38H|Function||30H<br>38H|Function||38H<br>38H|Function|
|30H|||30H|||30H||



|**Command Message              Resp**|**Command Message              Resp**|**Command Message              Resp**|**onse Message (Normal)      Response**|**onse Message (Normal)      Response**|**onse Message (Normal)      Response**|**Message (Error)**|**Message (Error)**|
|---|---|---|---|---|---|---|---|
|3AH|STX||3AH|STX||3AH|STX|
|30H|Node Address||30H|Node Address||30H|Node Address|
|31H|||31H|||31H||
|30H|Function||30H|Function||38H|Function|
|38H|||38H|||38H||
|30H|||30H|||30H||
|30H|Test Code||30H|Test Code||33H|Exception code|
|30H|||30H|||30H|LRC CHECK|
|30H|||30H|||36H||
|41H|DATA||41H|DATA||0DH|END|
|||||||0AH||
|35H|||35H|||||
|33H|||33H|||||
|37H|||37H|||||
|31H|LRC CHECK||31H|LRC CHECK||||
|42H|||42H|||||
|0DH|END||0DH<br>0AH|END||||
|0AH||||||||



## **RTU Mode** 

|**Command Message             Resp**<br>NodeAddress<br>01 H<br>Function<br>08H<br>Test Code<br>High<br>00H<br>Low<br>00H<br>DATA<br>High<br>A5H<br>Low<br>37H<br>CRC-16<br>High<br>DAH<br>Low<br>8DH|**Command Message             Resp**<br>NodeAddress<br>01 H<br>Function<br>08H<br>Test Code<br>High<br>00H<br>Low<br>00H<br>DATA<br>High<br>A5H<br>Low<br>37H<br>CRC-16<br>High<br>DAH<br>Low<br>8DH|**Command Message             Resp**<br>NodeAddress<br>01 H<br>Function<br>08H<br>Test Code<br>High<br>00H<br>Low<br>00H<br>DATA<br>High<br>A5H<br>Low<br>37H<br>CRC-16<br>High<br>DAH<br>Low<br>8DH|**onse Message (Normal)       Response**<br>NodeAddress<br>01H<br>Function<br>08H<br>Test Code High<br>00H<br>Low<br>00H<br>DATA<br>High<br>A5H<br>Low<br>37H<br>CRC-16<br>High<br>DAH<br>Low<br>8DH|**onse Message (Normal)       Response**<br>NodeAddress<br>01H<br>Function<br>08H<br>Test Code High<br>00H<br>Low<br>00H<br>DATA<br>High<br>A5H<br>Low<br>37H<br>CRC-16<br>High<br>DAH<br>Low<br>8DH|**onse Message (Normal)       Response**<br>NodeAddress<br>01H<br>Function<br>08H<br>Test Code High<br>00H<br>Low<br>00H<br>DATA<br>High<br>A5H<br>Low<br>37H<br>CRC-16<br>High<br>DAH<br>Low<br>8DH|**Message (Error)**|**Message (Error)**|**Message (Error)**|
|---|---|---|---|---|---|---|---|---|
|NodeAddress||01 H|NodeAddress||01H|NodeAddress||01H|
|Function||08H|Function||08H|Function||88H|
|Test Code|High|00H|Test Code|High|00H|Exceptioncode||03H|
||Low|00H||<br>Low|00H|CRC-16|High|06H|
|DATA|High|A5H|DATA|High|A5H||Low|01H|
||Low|37H||Low|37H||||
|CRC-16|High|DAH|CRC-16|High|DAH||||
||Low|8DH||Low|8DH||||



1-10 

## **Write Single Holding Register [06H]** 

Write single holding register. The register address of the holding register is specified in the message. 

**Example:** Write a 60.00Hz frequency command to node address 1. 

## **ASCII Mode** 

**Command Message            Response Message (Normal)       Response Message (Error)** 

|3AH|STX||3AH|STX||3AH|STX|
|---|---|---|---|---|---|---|---|
|30H|Node Address||30H|Node Address||30H|Node Address|
|31H|||31H|||31H||
|30H|Function||30H|Function||38H|Function|
|36H|||36H|||36H||
|32H|Starting<br>Register||32H|Starting<br>Register||30H|Exception code|
|35H|||35H|||33H||
|30H|||30H|||30H|LRC CHECK|
|32H|||32H|||32H||
|31H|DATA||31H|DATA||0DH|END|
|||||||0AH||
|37H|||37H|||||
|37H|||37H|||||
|30H|||30H|||||
|34H|LRC CHECK||34H|LRC CHECK||||
|42H|||42H|||||
|0DH|END||0DH<br>0AH|END||||
|0AH||||||||



## **RTU Mode** 

|**Command Message             Resp**<br>NodeAddress<br>01 H<br>Function<br>06H<br>Start No<br>High<br>25H<br>Low<br>02H<br>DATA<br>High<br>17H<br>Low<br>70H<br>CRC-16<br>High<br>2DH<br>Low<br>12H|**Command Message             Resp**<br>NodeAddress<br>01 H<br>Function<br>06H<br>Start No<br>High<br>25H<br>Low<br>02H<br>DATA<br>High<br>17H<br>Low<br>70H<br>CRC-16<br>High<br>2DH<br>Low<br>12H|**Command Message             Resp**<br>NodeAddress<br>01 H<br>Function<br>06H<br>Start No<br>High<br>25H<br>Low<br>02H<br>DATA<br>High<br>17H<br>Low<br>70H<br>CRC-16<br>High<br>2DH<br>Low<br>12H|**onse Message (Normal)      Respons**<br>NodeAddress<br>01H<br>Function<br>06H<br>Start No<br>High<br>25H<br>Low<br>02H<br>DATA<br>High<br>17H<br>Low<br>70H<br>CRC-16<br>High<br>2DH<br>Low<br>12H|**onse Message (Normal)      Respons**<br>NodeAddress<br>01H<br>Function<br>06H<br>Start No<br>High<br>25H<br>Low<br>02H<br>DATA<br>High<br>17H<br>Low<br>70H<br>CRC-16<br>High<br>2DH<br>Low<br>12H|**onse Message (Normal)      Respons**<br>NodeAddress<br>01H<br>Function<br>06H<br>Start No<br>High<br>25H<br>Low<br>02H<br>DATA<br>High<br>17H<br>Low<br>70H<br>CRC-16<br>High<br>2DH<br>Low<br>12H|**e Message (Error)**|**e Message (Error)**|**e Message (Error)**|
|---|---|---|---|---|---|---|---|---|
|NodeAddress||01 H|NodeAddress||01H|NodeAddress||01H|
|Function||06H|Function||06H|Function||86H|
|Start No|High|25H|Start No|High|25H|Exception code||03H|
||Low|02H||Low|02H|CRC-16|High|02H|
|DATA|High|17H|DATA|High|17H||Low|61H|
||Low|70H||Low|70H||||
|CRC-16|High|2DH|CRC-16|High|2DH||||
||Low|12H||Low|12H||||



1-11 

## **Write Multiple Holding Register [10H]** 

Write multiple holding registers. The address of the first holding register is specified in the message. 

**Example:** Write a 60.00Hz frequency command to node address 1 and enable FWD run command. 

## **ASCII Mode** 

**Command Message            Response Message (Normal)       Response Message (Error)** 

|3AH|STX||3AH|STX|
|---|---|---|---|---|
|30H|Node Address||30H|Node Address|
|31H|||31H||
|31H|Function||31H|Function|
|30H|||30H||
|30H|Starting<br>Register||32H|Starting<br>Register|
|31H|||35H||
|30H|||30H||
|31H|||31H||
|30H|Number of<br>Registers||30H|Number of<br>Registers|
|30H|||30H||
|30H|||30H||
|32H|||32H||
|30H|Number of<br>Bytes*||43H|LRC CHECK|
|34H|||37H||
|30H|DATA 1||0DH|END|
|30H|||0AH||
|30H|||||
|31H|||||
|31H|DATA 2||||
|37H|||||
|37H|||||
|30H|||||
|33H|LRC CHECK||||
|42H|||||
|0DH|END||||
|0AH|||||



- Number of bytes is register amount x 2 

1-12 

## **RTU Mode** 

|CommandMessageRespo<br>NodeAddress<br>01H<br>Function<br>10H<br>Starting<br>Register<br>High<br>25H<br>Low<br>01H<br>Number of<br>Registers<br>High<br>00H<br>Low<br>02H<br>Numberof Bytes*<br>04H<br>DATA 1<br>High<br>00H<br>Low<br>01H<br>DATA 2<br>High<br>17H<br>Low<br>70H<br>CRC-16<br>High<br>60H<br>Low<br>27H|CommandMessageRespo<br>NodeAddress<br>01H<br>Function<br>10H<br>Starting<br>Register<br>High<br>25H<br>Low<br>01H<br>Number of<br>Registers<br>High<br>00H<br>Low<br>02H<br>Numberof Bytes*<br>04H<br>DATA 1<br>High<br>00H<br>Low<br>01H<br>DATA 2<br>High<br>17H<br>Low<br>70H<br>CRC-16<br>High<br>60H<br>Low<br>27H|CommandMessageRespo<br>NodeAddress<br>01H<br>Function<br>10H<br>Starting<br>Register<br>High<br>25H<br>Low<br>01H<br>Number of<br>Registers<br>High<br>00H<br>Low<br>02H<br>Numberof Bytes*<br>04H<br>DATA 1<br>High<br>00H<br>Low<br>01H<br>DATA 2<br>High<br>17H<br>Low<br>70H<br>CRC-16<br>High<br>60H<br>Low<br>27H|nseMessage (Normal)Response M<br>NodeAddress<br>01H<br>Function<br>10H<br>Starting<br>Register<br>High<br>25H<br>Low<br>01H<br>Number of<br>Registers<br>High<br>00H<br>Low<br>02H<br>CRC-16<br>High<br>1BH<br>Low<br>04H|nseMessage (Normal)Response M<br>NodeAddress<br>01H<br>Function<br>10H<br>Starting<br>Register<br>High<br>25H<br>Low<br>01H<br>Number of<br>Registers<br>High<br>00H<br>Low<br>02H<br>CRC-16<br>High<br>1BH<br>Low<br>04H|nseMessage (Normal)Response M<br>NodeAddress<br>01H<br>Function<br>10H<br>Starting<br>Register<br>High<br>25H<br>Low<br>01H<br>Number of<br>Registers<br>High<br>00H<br>Low<br>02H<br>CRC-16<br>High<br>1BH<br>Low<br>04H|essage (Error)|essage (Error)|essage (Error)|
|---|---|---|---|---|---|---|---|---|
|NodeAddress||01H|NodeAddress||01H|NodeAddress||01H|
|Function||10H|Function||10H|Function||90H|
|Starting<br>Register|High|25H|Starting<br>Register|High|25H|Exceptioncode||03H|
||Low|01H||Low|01H|CRC-16|High|0CH|
|Number of<br>Registers|High|00H|Number of<br>Registers|High|00H||Low|01H|
||Low|02H||Low|02H||||
|Numberof Bytes*||04H|CRC-16|High|1BH||||
|DATA 1|High|00H||Low|04H||||
||Low|01H|||||||
|DATA 2|High|17H|||||||
||Low|70H|||||||
|CRC-16|High|60H|||||||
||Low|27H|||||||



* Data amount is register amount x 2 

1-13 

## **1.0.3 Parameter Data** 

|**Function **|**Register No**|**Function **|**Register No**|**Function **|**Register No**|
|---|---|---|---|---|---|
|**Group 0**||**Group 0**||**Group 1**||
|0–00|0000H|0–43|002BH|1–00|0100H|
|0–01|0001H|0– 44|002CH|1 –01|0101H|
|0–02|0002H|0– 45|002DH|1 –02|0102H|
|0–03|0003H|0– 46|002EH|1 –03|0103H|
|0–04|0004H|0– 47|002FH|1 –04|0104H|
|0–05|0005H|0–48|0030H|1–05|0105H|
|0–06|0006H|0–49|0031H|1–06|0106H|
|0–07|0007H|0–50|0032H|1 –07|0107H|
|0–08|0008H|0–51|0033H|1 –08|0108H|
|0–09|0009H|0–52|0034H|1 –09|0109H|
|0– 10|000AH|0–53|0035H|1 – 10|010AH|
|0–11|000BH|0–54|0036H|1–11|010BH|
|0–12|000CH|0–55|0037H|1–12|010CH|
|0– 13|000DH|0–56|0038H|1 – 13|010DH|
|0– 14|000EH|0–57|0039H|1 – 14|010EH|
|0– 15|000FH|||1 – 15|010FH|
|0– 16|0010H|||1 – 16|0110H|
|0–17|0011H|||1–17|0111H|
|0–18|0012H|||1–18|0112H|
|0– 19|0013H|||1 – 19|0113H|
|0– 20|0014H|||1 – 20|0114H|
|0– 21|0015H|||1 – 21|0115H|
|0– 22|0016H|||1 – 22|0116H|
|0–23|0017H|||1–23|0117H|
|0–24|0018H|||1–24|0118H|
|0– 25|0019H|||1 – 25|0119H|
|0– 26|001AH|||||
|0– 27|001BH|||||
|0– 28|001CH|||||
|0–29|001DH|||||
|0–30|001EH|||||
|0–31|001FH|||||
|0–32|0020H|||||
|0–33|0021H|||||
|0–34|0022H|||||
|0–35|0023H|||||
|0–36|0024H|||||
|0–37|0025H|||||
|0–38|0026H|||||
|0–39|0027H|||||
|0– 40|0028H|||||
|0–41|0029H|||||
|0–42|002AH|||||



1-14 

|**Function**|**Register**<br>**No**|**Function**|**Register**<br>**No**|**Function**|**Register**<br>**No**|**Function**|**Register**<br>**No**|
|---|---|---|---|---|---|---|---|
|**Group 2**||**Group 3**||**Group 3**||**Group 4**||
|2 –00|0200H|3–00|0300H|3– 43|032BH|4 –00|0400H|
|2–01|0201H|3–01|0301H|3–44|032CH|4–01|0401H|
|2–02|0202H|3–02|0302H|3–45|032DH|4–02|0402H|
|2 –03|0203H|3–03|0303H|3– 46|032EH|4 –03|0403H|
|2 –04|0204H|3–04|0304H|3– 47|032FH|4 –04|0404H|
|2 –05|0205H|3–05|0305H|||4 –05|0405H|
|2 –06|0206H|3–06|0306H|||4 –06|0406H|
|2–07|0207H|3–07|0307H|||4–07|0407H|
|2–08|0208H|3–08|0308H|||4–08|0408H|
|2 –09|0209H|3–09|0309H|||4 –09|0409H|
|2 – 10|020AH|3– 10|030AH|||4 – 10|040AH|
|2 – 11|020BH|3– 11|030BH|||4 – 11|040BH|
|2 – 12|020CH|3– 12|030CH|||4 – 12|040CH|
|2–13|020DH|3–13|030DH|||4–13|040DH|
|2–14|020EH|3–14|030EH|||4–14|040EH|
|2 – 15|020FH|3– 15|030FH|||4 – 15|040FH|
|2 – 16|0210H|3– 16|0310H|||4 – 16|0410H|
|2 – 17|0211H|3– 17|0311H|||4 – 17|0411H|
|2 – 18|0212H|3– 18|0312H|||4 – 18|0412H|
|2–19|0213H|3–19|0313H|||4–19|0413H|
|2–20|0214H|3–20|0314H|||4–20|0414H|
|2 – 21|0215H|3– 21|0315H|||||
|2 – 22|0216H|3– 22|0316H|||||
|2 – 23|0217H|3– 23|0317H|||||
|2 – 24|0218H|3– 24|0318H|||||
|2–25|0219H|3–25|0319H|||||
|2–26|021AH|3–26|031AH|||||
|2 – 27|021BH|3– 27|031BH|||||
|2 – 28|021CH|3– 28|031CH|||||
|2 – 29|021DH|3– 29|031DH|||||
|2 –30|021EH|3–30|031EH|||||
|2–31|021FH|3–31|031FH|||||
|2–32|0220H|3–32|0320H|||||
|2 –33|0221H|3–33|0321H|||||
|2 –34|0222H|3–34|0322H|||||
|2 –35|0223H|3–35|0323H|||||
|2 –36|0224H|3–36|0324H|||||
|2–37|0225H|3–37|0325H|||||
|||3–38|0326H|||||
|||3–39|0327H|||||
|||3– 40|0328H|||||
|||3– 41|0329H|||||
|||3– 42|032AH|||||
|||||||||



1-15 

|**Function **|**Register No**|**Function **|**Register No**|**Function **|**Register No**|
|---|---|---|---|---|---|
|**Group 5**||**Group 5**||**Group 6**||
|5–00|0500H|5–33|0521H|6–00|0600H|
|5–01|0501H|5–34|0522H|6–01|0601H|
|5–02|0502H|5–35|0523H|6–02|0602H|
|5–03|0503H|5–36|0524H|6–03|0603H|
|5–04|0504H|5–37|0525H|6–04|0604H|
|5–05|0505H|5–38|0526H|6–05|0605H|
|5–06|0506H|5–39|0527H|6–06|0606H|
|5–07|0507H|5–40|0528H|6–07|0607H|
|5–08|0508H|5–41|0529H|6–08|0608H|
|5–09|0509H|5– 42|052AH|6–09|0609H|
|5– 10|050AH|5– 43|052BH|6– 10|060AH|
|5– 11|050BH|5– 44|052CH|6– 11|060BH|
|5– 12|050CH|5– 45|052DH|6– 12|060CH|
|5–13|050DH|5–46|052EH|6–13|060DH|
|5–14|050EH|5–47|052FH|6–14|060EH|
|5– 15|050FH|5– 48|0530H|6– 15|060FH|
|5– 16|0510H|||6– 16|0610H|
|5– 17|0511H|||6– 17|0611H|
|5– 18|0512H|||6– 18|0612H|
|5–19|0513H|||6–19|0613H|
|5–20|0514H|||6–20|0614H|
|5– 21|0515H|||6– 21|0615H|
|5– 22|0516H|||6– 22|0616H|
|5– 23|0517H|||6– 23|0617H|
|5– 24|0518H|||6– 24|0618H|
|5–25|0519H|||6–25|0619H|
|5–26|051AH|||6–26|061AH|
|5– 27|051BH|||6– 27|061BH|
|5– 28|051CH|||6– 28|061CH|
|5– 29|051DH|||6– 29|061DH|
|5–30|051EH|||6–30|061EH|
|5–31|051FH|||6–31|061FH|
|5–32|0520H|||6–32|0620H|



1-16 

|**Function**|**Register**<br>**No**|**Function**|**Register No**|**Function**|**Register No**|**Function**|**Register**<br>**No**|
|---|---|---|---|---|---|---|---|
|**Group 6**||**Group 7**||**Group 8**||**Group 8**||
|6–33|0621H|7–00|0700H|8–00|0800H|8–41|0829H|
|6–34|0622H|7 –01|0701H|8–01|0801H|8– 42|082AH|
|6–35|0623H|7 –02|0702H|8–02|0802H|8– 43|082BH|
|6–36|0624H|7 –03|0703H|8–03|0803H|8– 44|082CH|
|6–37|0625H|7 –04|0704H|8–04|0804H|||
|6–38|0626H|7–05|0705H|8–05|0805H|||
|6–39|0627H|7–06|0706H|8–06|0806H|||
|6– 40|0628H|7 –07|0707H|8–07|0807H|||
|6– 41|0629H|7 –08|0708H|8–08|0808H|||
|6– 42|062AH|7 –09|0709H|8–09|0809H|||
|6– 43|062BH|7 – 10|070AH|8– 10|080AH|||
|6–44|062CH|7–11|070BH|8–11|080BH|||
|6–45|062DH|7–12|070CH|8–12|080CH|||
|6– 46|062EH|7 – 13|070DH|8– 13|080DH|||
|6– 47|062FH|7 – 14|070EH|8– 14|080EH|||
|||7 – 15|070FH|8– 15|080FH|||
|||7 – 16|0710H|8– 16|0810H|||
|||7–17|0711H|8–17|0811H|||
|||7–18|0712H|8–18|0812H|||
|||7 – 19|0713H|8– 19|0813H|||
|||7 – 20|0714H|8– 20|0814H|||
|||7 – 21|0715H|8– 21|0815H|||
|||7 – 22|0716H|8– 22|0816H|||
|||7–23|0717H|8–23|0817H|||
|||7–24|0718H|8–24|0818H|||
|||7 – 25|0719H|8– 25|0819H|||
|||7 – 26|071AH|8– 26|081AH|||
|||7 – 27|071BH|8– 27|081BH|||
|||7 – 28|071CH|8– 28|081CH|||
|||7–29|071DH|8–29|081DH|||
|||7–30|071EH|8–30|081EH|||
|||7 –31|071FH|8–31|081FH|||
|||7 –32|0720H|8–32|0820H|||
|||7 –33|0721H|8–33|0821H|||
|||||8–34|0822H|||
|||||8–35|0823H|||
|||||8–36|0824H|||
|||||8–37|0825H|||
|||||8–38|0826H|||
|||||8–39|0827H|||
|||||8– 40|0828H|||



1-17 

|**Function **|**Register No**|**Function **|**Register No**|**Function **|**Register No**|
|---|---|---|---|---|---|
|**Group 9**||**Group 10**||**Group 11**||
|9–00|0900H|10–00|0A00H|11 –00|0B00H|
|9–01|0901H|10–01|0A01H|11–01|0B01H|
|9–02|0902H|10–02|0A02H|11–02|0B02H|
|9–03|0903H|10–03|0A03H|11 –03|0B03H|
|9–04|0904H|10–04|0A04H|11 –04|0B04H|
|9–05|0905H|10–05|0A05H|11 –05|0B05H|
|9–06|0906H|10–06|0A06H|11 –06|0B06H|
|9–07|0907H|10–07|0A07H|11–07|0B07H|
|9–08|0908H|10–08|0A08H|11–08|0B08H|
|9–09|0909H|10–09|0A09H|11 –09|0B09H|
|||10– 10|0A0AH|11 – 10|0B0AH|
|||10– 11|0A0BH|11 – 11|0B0BH|
|||10– 12|0A0CH|11 – 12|0B0CH|
|||10–13|0A0DH|11–13|0B0DH|
|||10–14|0A0EH|11–14|0B0EH|
|||10– 15|0A0FH|11 – 15|0B0FH|
|||10– 16|0A10H|11 – 16|0B10H|
|||10– 17|0A11H|11 – 17|0B11H|
|||10– 18|0A12H|11 – 18|0B12H|
|||10–19|0A13H|11–19|0B13H|
|||10–20|0A14H|11–20|0B14H|
|||10– 21|0A15H|11 – 21|0B15H|
|||10– 22|0A16H|11 – 22|0B16H|
|||10– 23|0A17H|11 – 23|0B17H|
|||10– 24|0A18H|11 – 24|0B18H|
|||10–25|0A19H|11–25|0B19H|
|||10–26|0A1AH|11–26|0B1AH|
|||10– 27|0A1BH|11 – 27|0B1BH|
|||10– 28|0A1CH|11 – 28|0B1CH|
|||10– 29|0A1DH|11 – 29|0B1DH|
|||10–30|0A1EH|11 –30|0B1EH|
|||10–31|0A1FH|11–31|0B1FH|
|||10–32|0A20H|11-32|0B20H|
|||10–33|0A21H|11 –33|0B21H|
|||10–34|0A22H|11 –34|0B22H|
|||10–35|0A23H|11 –35|0B23H|
|||10–36|0A24H|11 –36|0B24H|
|||10–37|0A25H|11–37|0B25H|
|||10–38|0A26H|11–38|0B26H|
|||10–39|0A27H|11 –39|0B27H|
|||10– 40|0A28H|11 – 40|0B28H|
|||10– 41|0A29H|11 – 41|0B29H|
|||||11 – 42|0B2AH|
|||||11 – 43|0B2BH|



1-18 

|**Function **|**Register No**|**Function **|**Register No**|**Function **|**Register No**|
|---|---|---|---|---|---|
|**Group 11**||**Group 12**||**Group 12**||
|11 – 44|0B2CH|12 – 00|High WORD:<br>2510H<br>Low WORD:<br>2511H|12 – 35|0C23H|
|11–45|0B2DH|12–01|0C01H|12–36|0C24H|
|11–46|0B2EH|12–02|0C02H|12–37|0C25H|
|11 – 47|0B2FH|12 –03|0C03H|12 –38|0C26H|
|11 – 48|0B30H|12 –04|0C04H|12 –39|0C27H|
|11 – 49|0B31H|12 –05|0C05H|12 – 40|0C28H|
|11 –50|0B32H|12 –06|0C06H|12 – 41|0C29H|
|11–51|0B33H|12–07|0C07H|12–42|0C2AH|
|11–52|0B34H|12–08|0C08H|12–43|0C2BH|
|11 –53|0B35H|12 –09|0C09H|12 – 44|0C2CH|
|11 –54|0B36H|12 – 10|0C0AH|12 – 45|0C2DH|
|11 –55|0B37H|12 – 11|0C0BH|12 – 46|0C2EH|
|11 –56|0B38H|12 – 12|0C0CH|12 – 47|0C2FH|
|11–57|0B39H|12–13|0C0DH|12–48|0C30H|
|11–58|0B3AH|12–14|0C0EH|12–49|0C31H|
|11 –59|0B3BH|12 – 15|0C0FH|12 -50|0C32H|
|11 –60|0B3CH|12 – 16|0C10H|12 -51|0C33H|
|11 –61|0B3DH|12 – 17|0C11H|12 –52|0C34H|
|11 –62|0B3EH|12 – 18|0C12H|12 –53|0C35H|
|11–63|0B3FH|12–19|0C13H|12–54|0C36H|
|11–64|0B40H|12–20|0C14H|12–55|0C37H|
|11 –65|0B41H|12 – 21|0C15H|12 –56|0C38H|
|||12 – 22|0C16H|12 –57|0C39H|
|||12 – 23|0C17H|12 –58|0C3AH|
|||12 – 24|0C18H|12 –59|0C3BH|
|||12–25|0C19H|12–60|0C3CH|
|||12–26|0C1AH|12–61|0C3DH|
|||12 – 27|0C1BH|12 –62|0C3EH|
|||12 – 28|0C1CH|12 –63|0C3FH|
|||12 – 29|0C1DH|12 –64|0C40H|
|||12 –30|0C1EH|12 –65|0C41H|
|||12–31|0C1FH|12–66|0C42H|
|||12-32|0C20H|12–67|0C43H|
|||12 –33|0C21H|12 –68|0C44H|
|||12 –34|0C22H|12 –69|0C45H|



1-19 

|**Function **|**Register No**|**Function **|**Register No**|**Function **|**Register No**|
|---|---|---|---|---|---|
|**Group 12**||**Group 13**||**Group 14**||
|12 – 70|0C46H|13–00|0D00H|14 –00|0E00H|
|12–71|0C47H|13–01|0D01H|14–01|0E01H|
|12–72|0C48H|13–02|0D02H|14–02|0E02H|
|12 – 73|0C49H|13–03|0D03H|14 –03|0E03H|
|12 – 74|0C4AH|13–04|0D04H|14 –04|0E04H|
|12 – 75|0C4BH|13–05|0D05H|14 –05|0E05H|
|12 – 76|0C4CH|13–06|0D06H|14 –06|0E06H|
|12–77|0C4DH|13–07|0D07H|14–07|0E07H|
|12–78|0C4EH|13–08|0D08H|14–08|0E08H|
|12 – 79|0C4FH|13–09|0D09H|14 –09|0E09H|
|||13– 10|0D0AH|14 – 10|0E0AH|
|||13– 11|0D0BH|14 – 11|0E0BH|
|||13– 12|0D0CH|14 – 12|0E0CH|
|||13–13|0D0DH|14–13|0E0DH|
|||13–14|0D0EH|14–14|0E0EH|
|||13– 15|0D0FH|14 – 15|0E0FH|
|||||14 – 16|0E10H|
|||||14 – 17|0E11H|
|||||14 – 18|0E12H|
|||||14–19|0E13H|
|||||14–20|0E14H|
|||||14 – 21|0E15H|
|||||14 – 22|0E16H|
|||||14 – 23|0E17H|
|||||14 – 24|0E18H|
|||||14–25|0E19H|
|||||14–26|0E1AH|
|||||14 – 27|0E1BH|
|||||14 – 28|0E1CH|
|||||14 – 29|0E1DH|
|||||14 –30|0E1EH|
|||||14–31|0E1FH|
|||||14–32|0E20H|
|||||14 –33|0E21H|
|||||14 –34|0E22H|



1-20 

|**Function **|**Register No**|**Function **|**Register No**|**Function **|**Register No**|
|---|---|---|---|---|---|
|**Group 14**||**Group 15**||**Group 16**||
|14 –35|0E23H|15–00|0F00H|16–00|1000H|
|14–36|0E24H|15–01|0F01H|16–01|1001H|
|14–37|0E25H|15–02|0F02H|16–02|1002H|
|14 –38|0E26H|15–03|0F03H|16–03|1003H|
|14 –39|0E27H|15–04|0F04H|16–04|1004H|
|14 – 40|0E28H|15–05|0F05H|16–05|1005H|
|14 – 41|0E29H|15–06|0F06H|16–06|1006H|
|14–42|0E2AH|15–07|0F07H|16–07|1007H|
|14–43|0E2BH|15–08|0F08H|16–08|1008H|
|14 – 44|0E2CH|15–09|0F09H|16–09|1009H|
|14 – 45|0E2DH|15– 10|0F0AH|||
|14 – 46|0E2EH|15– 11|0F0BH|||
|14 – 47|0E2FH|15– 12|0F0CH|||
|||15–13|0F0DH|||
|||15–14|0F0EH|||
|||15– 15|0F0FH|||
|||15– 16|0F10H|||
|||15– 17|0F11H|||
|||15– 18|0F12H|||
|||15–19|0F13H|||
|||15–20|0F14H|||
|||15– 21|0F15H|||
|||15– 22|0F16H|||
|||15– 23|0F17H|||
|||15– 24|0F18H|||
|||15–25|0F19H|||
|||15–26|0F1AH|||
|||15– 27|0F1BH|||
|||15– 28|0F1CH|||
|||15– 29|0F1DH|||
|||15–30|0F1EH|||
|||15–31|0F1FH|||
|||15–32|0F20H|||



1-21 

|**Function **|**Register No**|**Function **|**Register No**|**Function **|**Register No**|
|---|---|---|---|---|---|
|**Group 17**||**Group 18**||**Group 19**||
|17 –00|1100H|18–00|1200H|19–00|1300H|
|17–01|1101H|18–01|1201H|19–01|1301H|
|17–02|1102H|18–02|1202H|19–02|1302H|
|17 –03|1103H|18–03|1203H|19–03|1303H|
|17 –04|1104H|18–04|1204H|19–04|1304H|
|17 –05|1105H|18–05|1205H|19–05|1305H|
|17 –06|1106H|18–06|1206H|19–06|1306H|
|17–07|1107H|||19–07|1307H|
|17–08|1108H|||||
|17 –09|1109H|||||
|17 – 10|110AH|||||
|17 – 11|110BH|||||
|17 – 12|110CH|||||
|17–13|110DH|||||
|17–14|110EH|||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||



1-22 

|**Function **|**Register No**|**Function **|**Register No**|**Function **|**Register No**|
|---|---|---|---|---|---|
|**Group 20**||**Group 21**||**Group 21**||
|20–00|1400H|21 –00|1500H|21 –33|1521H|
|20–01|1401H|21–01|1501H|21–34|1522H|
|20–02|1402H|21–02|1502H|21–35|1523H|
|20–03|1403H|21 –03|1503H|21 –36|1524H|
|20–04|1404H|21 –04|1504H|21 –37|1525H|
|20–05|1405H|21 –05|1505H|21 –38|1526H|
|20–06|1406H|21 –06|1506H|21 –39|1527H|
|20–07|1407H|21–07|1507H|21–40|1528H|
|20–08|1408H|21–08|1508H|21–41|1529H|
|20–09|1409H|21 –09|1509H|21 – 42|152AH|
|20– 10|140AH|21 – 10|150AH|21 – 43|152BH|
|20– 11|140BH|21 – 11|150BH|||
|20– 12|140CH|21 – 12|150CH|||
|20–13|140DH|21–13|150DH|||
|20–14|140EH|21–14|150EH|||
|20– 15|140FH|21 – 15|150FH|||
|20– 16|1410H|21 – 16|1510H|||
|20– 17|1411H|21 – 17|1511H|||
|20– 18|1412H|21 – 18|1512H|||
|20–19|1413H|21–19|1513H|||
|20–20|1414H|21–20|1514H|||
|20– 21|1415H|21 – 21|1515H|||
|20– 22|1416H|21 – 22|1516H|||
|20– 23|1417H|21 – 23|1517H|||
|20– 24|1418H|21 – 24|1518H|||
|20–25|1419H|21–25|1519H|||
|20–26|141AH|21–26|151AH|||
|20– 27|141BH|21 – 27|151BH|||
|20– 28|141CH|21 – 28|151CH|||
|20– 29|141DH|21 – 29|151DH|||
|20–30|141EH|21 –30|151EH|||
|20–31|141FH|21–31|151FH|||
|20–32|1420H|21–32|1520H|||
|20–33|1421H|||||
|20–34|1422H|||||
|20–35|1423H|||||
|||||||



1-23 

|**Function **|**Register No**|**Function **|**Register No**|**Function **|**Register No**|
|---|---|---|---|---|---|
|**Group 22**||||||
|22 –00|1600H|||||
|22–01|1601H|||||
|22–02|1602H|||||
|22 –03|1603H|||||
|22 –04|1604H|||||
|22 –05|1605H|||||
|22 –06|1606H|||||
|22–07|1607H|||||
|22–08|1608H|||||
|22 –09|1609H|||||
|22 – 10|160AH|||||
|22 – 11|160BH|||||
|22 – 12|160CH|||||
|22–13|160DH|||||
|22–14|160EH|||||
|22 – 15|160FH|||||
|22 – 16|1610H|||||
|22 – 17|1611H|||||
|22 – 18|1612H|||||
|22–19|1613H|||||
|22–20|1614H|||||
|22 – 21|1615H|||||
|22 – 22|1616H|||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||
|||||||



1-24 

## **1.1 Profibus Communication Option Card** 

## **1.1.1 Introduction** 

This is a detailed description and application setup for the A510 Profibus DP communication option card (JN5-CM-PMUS). 

## **1.1.2 Specifications (JN50CM-PBUS)** 

The RS-485 port becomes unavailable for communication when the Profibus card is used. 

|**Specification**|**Description**|**Description**|**Description**|**Description**|**Description**|**Description**|**Description**|**Description**|**Description**|
|---|---|---|---|---|---|---|---|---|---|
|**Main Function**|Connect A510 inverter with Profibus-DP network|||||||||
|**Suitable Inverter**|A510 Series|||||||||
|**Mounting Base**|Connector on A510 Control Board|||||||||
|**Maximum Connection**|32 DP-Slave nodes|||||||||
|**Auto-Baud Search(bit/Sec)**|9.6K|19.2K|93.75K|187.5K|500K|1.5M|3M|6M|12M|
|**Transmission Distance(m)**|1200|1200|1200|1000|400|200|100|100|100|
|**Connection Medium**|Profibus Layer 2 Cable|||||||||
|**Optic Coupler Isolation**|Common Mode Rejection Vcm=50V,dV/dt=5000V/uSec|||||||||
|**Access Parameter**|16 Words in, 16 Words out|||||||||
|**Terminal Resistor**|DIP Switch SettingOn Board|||||||||
|**LED Indication**|Operation, Profibus communication|||||||||
|**Dimension**|101 mm  x  40.5 mm|||||||||



1-25 

## **1.1.3 Wiring Diagram** 


![](documentation/pdf_references/A510_comm_addendum.pdf-0028-01.png)


**----- Start of picture text -----**<br>
PLC<br>**----- End of picture text -----**<br>



![](documentation/pdf_references/A510_comm_addendum.pdf-0028-02.png)


**----- Start of picture text -----**<br>
SIEMENS SIMATIC S7 -300<br>IM<br>Profibus DP<br>- Card<br>CPU315 2 DP A510<br>CN1 CN3<br>220 Ω<br>MPI DP SW<br>DC + L+ LED1 LED2<br>-<br>-<br>24V M A B+ E<br>GREEN<br>RED<br>Profibus Layer2 Cable<br>**----- End of picture text -----**<br>


**Terminals of JN5-CM-PBUS** 

|**Terminal **|**Function **|
|---|---|
|**B+**|Profibus sends and receives signals<br>(Positive)|
|**A-**|Profibus sends and receives signals<br>(Negative)|
|**E**|Connect to the isolation layer of<br>Profibus Cable|



## **1.1.4 Installation** 

- Turn on the inverter and check the Software version in parameter 13-01. 

- In order to support functions of Profibus-DP communication card, it is necessary to use A510 inverter with software version 1.2 or newer version. 

- Set parameters 09-02, 00-02 and 00-05. Please refer to parameter group 9 for related communication parameters. Then turn off the inverter. 

- Remove the Digital Operator and front cover / terminal cover. Please also refer to Section 3.5 of the instruction manual, installation process to remove operator and covers for avoiding damage to the inverter. 

- Turn off the inverter and check the CHARGE indicator is OFF. 

1-26 

- Install the Profibus-DP communication card on the control board, with the holes aligned to the locking supports, and the connector CN1 aligned to CN3 (36pin) of the control board. Please refer to the following figure. 

   - Connect the Profibus Layer 2 Cable to TB1 on the Profibus-DP Option Card. 

   - (The green line is for A-, and the red one is for B+ ) 

   - Set Profibus Address and terminal resistor via SW1 and SW2. (Refer to section 1.1.5 for information of setting of SW1 and SW2.) 

   - Turn on Inverter. 

1-27 

**(1) For IP00/ IP20 models** 

-  Unfasten screws on the terminal cover. 

-  Press the latch on both sides and remove the terminal cover. 

-  Press the latch on the side of digital operator to remove it. 

-  Disconnect the RJ45 cable from the digital operator. 

-  Press the latch on both sides of the front cover, and remove the front cover. 

-  Install option card. 

-  Follow the instructions above in a reverse order to re-install covers and operator. 


![](documentation/pdf_references/A510_comm_addendum.pdf-0030-09.png)


**----- Start of picture text -----**<br>
;<br>**----- End of picture text -----**<br>


1-28 

## **1.1.5 Descriptions of Terminals, LEDs and DIP switch** 


![](documentation/pdf_references/A510_comm_addendum.pdf-0031-01.png)


**----- Start of picture text -----**<br>
CN1<br>**----- End of picture text -----**<br>


## **(1) Terminals** 

|**Terminals**|**Description**|
|---|---|
|**B+**|Profibus Signal(Positive)|
|**A-**|Profibus Signal(Negative)|
|**E**|Connect to shield of Profibus Cable|



## **(2) LED** 

|**LED**|**Description**|
|---|---|
|**LED1(Red)**|LED lights duringthe Profibus-DP communication.|
|**LED2(Red)**|LED lights while the option card operates without error.|



## **(3) DIP Switch** 

- A. SW1 (Profibus Address. Set SW1-6, 1-7, 1-8 to OFF) 

|**Address**|**SW1-5**|**SW1-4**|**SW1-3**|**SW1-2**|**SW1-1**|
|---|---|---|---|---|---|
|**1**|OFF|OFF|OFF|OFF|OFF|
|**2**|OFF|OFF|OFF|OFF|ON|
|**...**|||**...**|||
|**30**|ON|ON|ON|OFF|ON|
|**31**|ON|ON|ON|ON|OFF|



1-29 

## B. SW2 (Terminal Resistor) 

|**SW2**|**Description**|
|---|---|
|**ON**|Enable terminal resistor between B+ and A-|
|**OFF**|Disable terminal resistor between B+ and A-|



## **1.1.6 Related Parameters for Communication** 

The Profibus master PLC can monitor the status of A510 via Profibus DP option card when parameter 0901 is set to 4 (Profibus). Operating and frequency commands are enabled by the setting of 00-02 to 2 and 00-05 to 3 (communication control). Refer to the following table: 

|**Group**|**Parameter Name**|**Setting Range**|**Default**|
|---|---|---|---|
|09-01|Communication Selection|4:Profibus|0|
|00-02|Main Run Command Source Selection|2:Communication Control|1|
|00-05|Main Frequency Command Source Selection|3:CommunicationControl|1|



## **1.1.7 Profibus I/O List** 

The Profibus master (PLC) configuration defines the Profibus I/O address with a range of 400~431. See table below for Profibus address and related parameters. 

## **(1) Data input (Data sent by the inverter to the PLC)** 

||**Profibus**||||||
|---|---|---|---|---|---|---|
|**No.**|||**Bit**|**Description**|||
||**address**||||||
||||||||
||PIW400|Signal<br>Status|0|Inverterstatus|1 : Running|0:Stop|
||||1|Direction status|1 : Reverse|0 : Forward|
||||2|Inverter ready status|1 : Inverter ready|0 : Preparing|
||||3|Error|1 : Abnormal||
||||4|Alarm|1 :“ON”||
||||5|Zero Speed|1 :“ON”||
||||6|440 class type|1 :“ON”||
||||7|Frequency agree|1 :“ON”||
|1|||8|Setting frequency agree|1 :“ON”||
||||9|Frequency detection 1|1 :“ON”||
||||A|Frequency detection 2|1 :“ON”||
||||B|Under voltage|1 :“ON”||
||||C|BaseBlock|1 :“ON”||
||||D|Frequency command<br>source|1 : From Profibus protocol||
||||E|SeqNotFromComm|1 :“ON”||
||||F|Over torque|1 :“ON”||



1-30 

||**Profibus**||||||
|---|---|---|---|---|---|---|
|**No.**|||**Bit**|**Description**|||
||**address**||||||
||||||||
||PIW402|Fault<br>Content|0||30||
||||1|UV|31||
||||2|OC|32||
||||3|OV|33||
||||4|OH1|34||
||||5|OL1|35||
||||6|OL2|36||
||||7|OT|37||
||||8|UT|38|CF07|
||||9|SC|39||
||||10|Ground OC|40||
||||11|Fuse broken|41|OLDOP|
||||12|Input Phase Loss|42||
||||13|OutputPhaseLoss|43||
||||14|PG Overspeed|44||
|2|||||||
||||15|PG Open|45||
||||||||
||||16|PG SpeedDeviation|46||
||||17|External Fault 01|47|SS1|
||||18|External Fault 02|48|CF20|
||||19|External Fault 03|49|RUN|
||||20|External Fault 04|||
||||21|External Fault 05|||
||||22|External Fault 06|||
||||23|External Fault 07|||
||||24|External Fault 08|||
||||25|FB|||
||||26|OPR|||
||||27||||
||||28|CE|||
||||29|STO|||
||PIW404|DI<br>Status|0|Programmable digital Input S1|||
||||1|Programmable digital Input S2|||
||||2|Programmable digital Input S3|||
||||3|Programmable digital Input S4|||
||||4|Programmable digital Input S5|||
||||5|Programmable digital Input S6|||
|3|||||||
||||6|Reserved|||
||||||||
||||7|Reserved|||
||||8|Reserved|||
||||9|Reserved|||
||||A|Reserved|||
||||B|Reserved|||



1-31 


![](documentation/pdf_references/A510_comm_addendum.pdf-0034-00.png)


||||C|Reserved|
|---|---|---|---|---|
||||D|Reserved|
||||E|Reserved|
||||F|Reserved|



||**Profibus**||**Bit**||||||||
|---|---|---|---|---|---|---|---|---|---|---|
|**No.**||||**Description**|||||||
||**address**||||||||||
||||||||||||
|4|PIW406||Frequency command (6000/60Hz)||||||||
|5|PIW408||Outputfrequency (6000/60Hz)||||||||
|6|PIW410||Reserved||||||||
|7|PIW412||Voltage command (1/0.1V)||||||||
|8|PIW414||Output current (1/0.1A)||||||||
||PIW416|Alarm<br>Content|0|No alarm|19|EF3|38|SE05|57|Reserved|
||||1|OV|20|EF4|39|HPERR|58|Reserved|
||||2|UV|21|EF5|40|EF|59|Reserved|
||||3|OL2|22|EF6|41|Reserved|60|Reserved|
||||4|OH2|23|EF7|42|Reserved|61|RETRY|
||||5|Reserved|24|EF8|43|RDP|62|SE07|
||||6|OT|25|Reserved|44|Reserved|63|SE08|
||||7|Reserved|26|CLB|45|OL1|64|Reserved|
||||8|Reserved|27|Reserved|46|HP_ER|65|OH1|
|9|||9|UT|28|CT|47|SE10|66|FIRE|
||||10|OS|29|USP|48|Reserved|67|ES|
||||11|PGO|30|RDE|49|BB1|68|STP1|
||||12|DEV|31|WRE|50|BB2|69|BDERR|
||||13|CE|32|FB|51|BB3|70|EPERR|
||||14|CALL|33|VRYE|52|BB4|71|ADCER|
||||15|Reserved|34|SE01|53|BB5|72|Reserved|
||||16|EF0|35|SE02|54|BB6|73|STP0|
||||17|EF1|36|SE03|55|BB7|74|ENC|
||||18|EF2|37|Reserved|56|BB8|75|STP2|
||PIW418|DO<br>Status|0|R1A-R1C output 0: No action 1:output|||||||
||||1|R2A-R2C output 0: No action 1:output|||||||
|10|||2|R3A-R3C output 0: No action 1:output|||||||
||||3-<br>15|Reserved|||||||
|11|PIW420||AO1(0.00V ~ 10.00V)||||||||
||PIW422||AO2 (0 ~ 1000) Voltage (corresponding to 0.00~10.00V) Current<br>(Corresponding to4mA~20mA)||||||||
|12|||||||||||
||||||||||||
|13|PIW424||AI 1 Input (1/0.1%)||||||||
|14|PIW426||AI 2 Input (1/0.1%)||||||||
|15|PIW428||Reserved||||||||
|16|PIW430||Reserved||||||||



1-32 

## **(2) Data output (Data sent by the PLC to the inverter)** 

||**Profibus**||**Bit**||
|---|---|---|---|---|
|**No.**||||**Description**|
||**address**||||
||||||
||PQW400|Operating<br>signal|0|Operating command<br>1 : Run<br>0:Stop|
||||1|Direction command<br>1 : Reversed<br>0 : Forward<br>(User can prohibit the direction via parameter 11-00,<br>0: Allow FWD/REV<br>1: Allow FWD only  2: Allow REV only )|
||||2|External fault<br>1 : Fault|
||||3|Faultreset<br>1 : Reset|
||||4|Reserved|
||||5|Reserved|
||||6|Programmable digital Input S1      1 :“ON”|
|1|||||
||||7|Programmable digital Input  S2      1 :“ON”|
||||||
||||8|Programmable digital Input  S3      1 :“ON”|
||||9|Programmable digital Input S4      1 :“ON”|
||||A|Programmable digital Input S51 :“ON”|
||||B|Programmable digital Input S61 :“ON”|
||||C|Reserved|
||||D|Reserved|
||||E|Controller mode         1 :“ON”|
||||F|Reserved|
|2|PQW402||Frequency Command (6000/60Hz)||
|3|PQW404||Torque Command (+/-8192 corresponding to rated torque +/-100%)||
|4|PQW406||Speedlimit (+/- 120 corresponding +/-120%)||
|5|PQW408||AO1(0.00V ~ 10.00V)||
||PQW410||AO2 (0 ~ 1000) Voltage (corresponding to 0.00~10.00V) Current<br>(corresponding to 4mA~20mA)||
|6|||||
||||||
||PQW412|DO Status|0|R1A-R1C output( 0: No action 1: output)<br>(Itis enabledwhile 03-11=32)|
||||1|R2A-R2C output ( 0: No action 1: output)<br>(It is enabled while 03-12=32)|
|7|||||
||||2|R3A-R3C output ( 0:No action 1: output)<br>(Itis enabledwhile 03-39=32)|
||||||
||||3-<br>15|Reserved|
|8|PQW414|<br> <br> <br>|Reserved||
|9|PQW416||||
|10|PQW418||||
|11|PQW420||||
|12|PQW422||||
|13|PQW424||||
|14|PQW426||||
|15|PQW428||||
|16|PQW430||||



1-33 

## **1.1.8 Error Message** 

If the Profibus DP option card is unable to communicate with the Profibus network or A510, or the option card is defective, the A510 will display an error message on the digital operator. For the majority of errors, LED1 on the communication option card will flash or be off, showing that a fault is active. 

||**Option**|||
|---|---|---|---|
|**Message**|<br>**card**|||
|||**Content**|**Description**|
|**in Operator**|**LED**|||
||**Status**|||
|||||
|**Communication**|LED1<br>Flash|Communication<br>Time-out|Profibus DP option card does not receive any data from<br>Profibus network in specified period.|
|**error 1**||||
|**Communication**|LED2<br>Flash|Dual port RAM<br>Fault|Dual-port RAM Fault.|
|**error 2**||||
|**Communication**|LED2<br>Flash|Dual port RAM<br>Checksum Error|Dual-port RAM Checksum Error while data is being<br>exchanged in Dual-port RAM.|
|**error 3**||||
|**Communication**|LED2<br>Flash|Dual port RAM<br>data error|Dual-port RAM data Error while data is being exchanged<br>in Dual-port RAM|
|**error 4**||||



## **1.1.9 GSD File** 

```
;/***********************************************************/
;/* Filename: Profibus-DP.GSD
;/* ModelName: TECO AC DRIVES A510 V2
;/* CreateDate: 2012.12.18
;/***********************************************************/
#Profibus_DP
GSD_Revision        = 1
Vendor_Name         = "TECO"
Model_Name          = "A510 V2-P"
Revision            = "Version0.0"
Ident_Number        = 0xA510
Protocol_Ident      = 0 ;Profibus-DP
Station_Type        = 0 ;DP Slaver
FMS_supp            = 0 ;Pure DP Device
Hardware_Release    = "HW_V1.0"
Software_Release    = "SW_V1.0"
;
9.6_supp            = 1
19.2_supp           = 1
93.75_supp          = 1
187.5_supp          = 1
500_supp            = 1
1.5M_supp           = 1
3M_supp             = 1
```

1-34 

```
6M_supp             = 1
12M_supp            = 1
MaxTsdr_9.6         = 60
MaxTsdr_19.2        = 60
MaxTsdr_93.75       = 60
MaxTsdr_187.5       = 60
MaxTsdr_500         = 100
MaxTsdr_1.5M        = 150
MaxTsdr_3M          = 250
MaxTsdr_6M          = 450
MaxTsdr_12M         = 800
Redundancy          = 0 ;Not Redundancy Supported
Repeater_Ctrl_Sig   = 2     ;TTL
24V_Pins            = 0 ;Not Connected
;
Implementation_Type = "VPC3"
Bitmap_Device     = "DP_NORM"
Bitmap_Diag         = "bmpdia"
Bitmap_SF           = "bmpsf"
;
Freeze_Mode_supp    = 1 ;Supported
Sync_Mode_supp      = 1 ;Supported
Auto_Baud_supp      = 1 ;Supported
Set_Slave_Add_supp  = 0 ;can not change via profibus
;
Fail_Safe           = 0
Slave_Family        = 1 ;Drives Family
Min_Slave_Intervall = 10      ;PollingCycle:10*100uS=1mS
;
Max_Diag_Data_Len   = 16
Max_User_Prm_Data_Len = 5
Modul_Offset        = 255
Ext_User_Prm_Data_Const(0) = 0x00,0x00,0x00,0x00,0x00
;
Modular_Station     = 1 ;Modular Device
Max_Module          = 1 ;Only 1 Module can be inserted
Max_Input_Len       = 32
Max_Output_Len      = 32
Max_Data_Len        = 64
Module="16 Word In,16 Word Out" 0x7f
EndModule
```

```
;Not Redundancy Supported
    ;TTL
;Not Connected
```

```
;Supported
;Supported
;Supported
;can not change via profibus
;Drives Family
    ;PollingCycle:10*100uS=1mS
```

1-35 

## **Appendix A: Communication Network** 

## **A1.1 RS485 –Network (Modbus)** 

This section shows a RS485 network consisting of several inverters communicating using the built-in Modbus RTU protocol. 


![](documentation/pdf_references/A510_comm_addendum.pdf-0038-03.png)


**----- Start of picture text -----**<br>
Inverter #1 Inverter #2 Inverter #n<br>Resistor<br>120 Ohm<br>S- S- S-<br>S+ E S+ E S+ E<br>- +<br>RS232/<br>RS485 Resistor<br>120 Ohm<br>- +<br>GND RX TX<br>PC / PLC<br>PC / PLC<br>RS485<br>RS232<br>**----- End of picture text -----**<br>


**Wiring diagram RS485 Modbus RTU Network** 

## **Notes:** 

- A PC / PLC controller with a built-in RS-485 interface can be connected directly to the RS-485 network. Use a RS232 to RS485 converter to connect a PC / PLC with a built-in RS-232 interface. 

- A maximum of 31 inverters can be connected to the network. Terminating resistors of 220 ohm must be installed at both end of the network. 

1-36 

# TECO Westinghouse 

# **A510** 

**Distributor** 

Teco-Westinghouse Motor Company 

5100 N. IH-35 

Round Rock, Texas 78681 

1-800-279-4007 

**www.tecowestinghouse.com** 

**Ver 01: 2015.04** 


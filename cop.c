 //  define names for the 4 Digital pins On the Arduino   

// These data pins link to 4 Relay board pins IN1, IN2, IN3,

#define RELAY1  8                        

#define RELAY2  9                        

#define RELAY3  10                        

#define RELAY4  11

#define LDRTOP  1                        

#define LDRDOWN  2                        

#define LDRRIGHT 3                        

#define LDRLEFT 4

 

void setup()

{    

// Initialise the Arduino data pins for OUTPUT

  pinMode(RELAY1, OUTPUT);       

  pinMode(RELAY2, OUTPUT);

  pinMode(RELAY3, OUTPUT);

  pinMode(RELAY4, OUTPUT);

  pinMode(LDRTOP, INPUT);       

  pinMode(LDRDOWN, INPUT);

  pinMode(LDRRIGHT, INPUT);

  pinMode(LDRLEFT, INPUT);

}

 

 void loop()

{
    int top = digitalRead(LDRTOP);
    int down = digitalRead(LDRDOWN);
    int left = digitalRead(LDRLEFT);
    int right = digitalRead(LDRRIGHT);

    if(top > down)
    {
        digitalRight(RELAY1, HIGH);
        delay(100);
    }
    else if(top < down)
    {
        digitalRight(RELAY2, HIGH);
        delay(100);
    }

    if(right > left)
    {
        digitalRight(RELAY3, HIGH);
        delay(100);
    }
    else if(left < right)
    {
        digitalRight(RELAY4, HIGH);
        delay(100);
    }
}
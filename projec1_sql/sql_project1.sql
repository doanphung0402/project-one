create database project1 ; 
use project1 ; 

create table if not exists user (
  id_user int auto_increment key, 
  password varchar(255) , 
  email varchar(255), 
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
)engine=innodb; 
 
create table if not exists user_detail (
	id_user_detail  int  auto_increment  key , 
    id_user int , 
    first_name varchar(255), 
    last_name varchar(255), 
	friend varchar(255), 
    constraint fk_user_detailt 
	foreign key(id_user) references user(id_user) 
	ON DELETE CASCADE 
    ON UPDATE CASCADE 
)engine=innodb; 

create table if not exists servey_send(
	 id_servey_send int auto_increment primary key , 
     id_user int ,
     option_content varchar(255), 
     option_choose varchar(255), 
	 send_to_email varchar(255),
     title varchar(255), 
     send_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
     foreign key(id_user) references user(id_user)
	 ON DELETE CASCADE 
     ON UPDATE CASCADE
)engine =innodb; 

create table if not exists servey_received(
     id_servey_received int auto_increment primary key , 
     id_user int , 
     received_from varchar(255), 
     option_content varchar(255), 
     option_choose varchar(255), 
     title varchar(255), 
     received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
     foreign key(id_user) references user(id_user)
	 ON DELETE CASCADE 
     ON UPDATE CASCADE
); 
create table booking(
  id_booking int auto_increment primary key , 
  id_user int , 
  title varchar(255), 
  location varchar(255), 
  period int , 
  decriptin varchar(255), 
  email_join varchar(255), 
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  time_start TIMESTAMP,
  received_from varchar(255), 
  send_to varchar(255),
  foreign key(id_user) references user(id_user)
   ON DELETE CASCADE 
   ON UPDATE CASCADE
)
 

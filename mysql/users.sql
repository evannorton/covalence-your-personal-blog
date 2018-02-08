drop user 'blogapp'@'localhost';

create user 'blogapp'@'localhost'
identified by 'enort';

grant all privileges
on blog.*
to 'blogapp'@'localhost'
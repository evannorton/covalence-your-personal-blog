alter table chirps
add constraint fk_chirpuser
foreign key (userid)
references users(id);

alter table mentions
add constraint fk_mentionuser
foreign key (userid)
references users(id);

alter table mentions
add constraint fk_mentionchirp
foreign key (chirpid)
references chirps(id);
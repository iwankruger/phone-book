#!/bin/sh
#make the dirs
mkdir -p /tmp/data/data
mkdir -p /tmp/data/log
mkdir -p /tmp/data/dump
#set the database file locations
/opt/mssql/bin/mssql-conf set filelocation.defaultdatadir /tmp/data/data
/opt/mssql/bin/mssql-conf set filelocation.defaultlogdir /tmp/data/log
/opt/mssql/bin/mssql-conf set filelocation.defaultdumpdir /tmp/data/dump
#start the server
/opt/mssql/bin/sqlservr
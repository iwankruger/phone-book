# Docker file for MSSQL to be installed on development & QA servers for testing purposes
# Idea is to have a persistent storage for the data even when the docker is stopped or restarted
FROM microsoft/mssql-server-linux:latest
LABEL maintainer="Iwan Kruger"

EXPOSE 1433

# apt-get and system utilities
RUN apt-get update && apt-get install -y \
	apt-utils curl apt-transport-https debconf-utils \
    && rm -rf /var/lib/apt/lists/*

# adding custom MS repository
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list

# install SQL Server drivers and tools
RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql mssql-tools --fix-missing
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
RUN /bin/bash -c "source ~/.bashrc"

#install locales
RUN apt-get -y install locales
RUN locale-gen en_US.UTF-8
RUN update-locale LANG=en_US.UTF-8

#copy the shell script to initialize the docker file
COPY ./init-docker.sh /
RUN ["chmod", "+x", "/init-docker.sh"]
ENTRYPOINT ["/bin/sh", "/init-docker.sh"]
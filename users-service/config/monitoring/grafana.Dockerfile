#FROM grafana/grafana:11.3.0
#COPY provisioning /etc/grafana/provisioning
FROM grafana/grafana:11.3.0
COPY provisioning.yml /etc/grafana/provisioning/datasources/datasource.yml
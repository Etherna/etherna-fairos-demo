FROM golang:1.15

RUN git clone --branch master https://github.com/fairdatasociety/fairOS-dfs.git
WORKDIR /go/fairOS-dfs
RUN make binary

EXPOSE 9090
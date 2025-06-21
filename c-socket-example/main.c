#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>

int main() {
    int server_fd, client_fd;
    struct sockaddr_in addr;
    char buffer[1024];
    
    server_fd = socket(AF_INET, SOCK_STREAM, 0);
    
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(8080);
    
    bind(server_fd, (struct sockaddr*)&addr, sizeof(addr));
    listen(server_fd, 1);
    
    printf("Server listening on port 8080...\n");
    
    client_fd = accept(server_fd, NULL, NULL);
    printf("Client connected!\n");
    
    while (1) {
        int bytes = recv(client_fd, buffer, sizeof(buffer), 0);
        if (bytes <= 0) break;
        
        printf("Received: %.*s", bytes, buffer);
        send(client_fd, buffer, bytes, 0);
    }
    
    close(client_fd);
    close(server_fd);
    return 0;
}

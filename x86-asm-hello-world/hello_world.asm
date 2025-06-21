.intel_syntax noprefix

.section .data
    hello_msg: .ascii "Hello, World!\n"
    msg_len = . - hello_msg

.section .text
    .global _start

_start:
    # Write system call
    mov rax, 1          # sys_write
    mov rdi, 1          # file descriptor 1 (stdout)
    mov rsi, offset hello_msg # message to write
    mov rdx, msg_len    # message length
    syscall             # call kernel

    # Exit system call
    mov rax, 60         # sys_exit
    mov rdi, 0          # exit status
    syscall             # call kernel
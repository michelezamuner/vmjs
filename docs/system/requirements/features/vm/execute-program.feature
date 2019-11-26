Feature: Execute program
    As a user
    I want to execute a program on the virtual machine
    In order to perform computations

    Scenario Outline: Program exits regularly
        Given the program is (pseudocode):
            """
            exit <code>
            """
        When I run the program on the VM
        Then the VM will exit with status code <code>
    Examples:
        | code |
        | 0    |
        | 128  |
        | 192  |

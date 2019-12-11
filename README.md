# Notes


## Domain definitions

The *virtual memory* is a memory area in the machine memory that simulates the memory available to the program execution. This memory is addressable, and can be read and write, and as such can be implemented in ES6 with just an Array, since it already implements the indexing interface through the indexing operator "[]".

The *registers* are a fixed number of fixed-size memory locations, which are not part of the virtual memory, since their size is always the same for every possible program. They can be implemented with just variables, and the performance will be the native one of ES6. In real processors, registers allow for a much faster access time than the main memory, but in a virtual machine this is not the case anymore, since they reside in the same memory as the virtual memory. However, according to the virtual machine implementation, it might be possible to optimize their use for better performance.

The *code segment* is an area in the virtual memory where executable code is stored. This area shouldn't be writeable: for now, we can assume that the compiler can target the right areas when converting high level code into memory read and write instructions.

The *code segment offset* is the address at which the code segment will be loaded in memory, and can be decided according to various criteria.

The *data segment* is an area in the virtual memory where data is stored, whose amount and size is known at the start of the program. This area is usually further partitioned in sub-sections, some of which are read-only. For now, we can assume that the compiler can target the right areas when converting high level code into memory read and write instructions.

The *data segment offset* is the address at which the data segment will be loaded in memory, and can be decided according to various criteria.

The *heap* is an area in the virtual memory where variable amounts of data with variable sizes can be stored. The heap can grow and shrink during program execution. All addresses of the heap must be tagged as used or not. When a new value must be stored in the heap, a contiguous area of not used addresses must be located first, before the value can be stored there, and those addresses can be set to used. When a value is removed from the heap, the addresses it was using must be set to not used. The highest used address of the heap determines the current size of the heap. The algorithm that selects the addresses to use should prefer lower addresses, to avoid increasing the size of the heap whenever possible. Due to how complex it is to find areas where to store data, heap allocation is the most expensive form of memory allocation in a program.

The *heap offset* is the address at which the heap starts in the virtual memory. Usually it's located after the data segment, at increasing addresses.

The *stack* is an area in the virtual memory where variable amounts of data with fixed sizes can be stored. The stack is a data structure providing high speed insertion and removal of frames from the top, and as such it's usually the best choice to allocate objects whose size is known at compile time. In ES6, it can be implemented with just an Array, since it already implements the "push()", "pop()" interface.

The *stack offset* is the address at which the stack starts in the virtual memory. To optimize memory usage, usually the stack starts from the top of available memory, and grows towards decreasing addresses, and competes with the heap for allocating virtual memory. The top of the stack and the top of the heap must be constantly monitored because when they become the same address, it means that the virtual memory is exhausted, and they cannot be allowed to start writing and reading each other's addresses.

The *word* is the reference unit that measures the size of addresses. For example, if the machine supports addresses of 8 bits, the word size will be 8 bits.

The *program image* is the distributable format of an executable program. The first word of the image contains the address at which the code segment starts. The second word of the image contains the address of the starting instruction of the program. After the first two words, and until the address of the code segment, the data segment is located. The code segment is located from its starting address, until the end of the image.

Procedure for running a program image:
- the program image is read from the given object file as a stream of bytes
- the code segment is loaded in the virtual memory, starting from the code segment offset (usually 0)
- the data segment is loaded in the virtual memory, starting from the data segment offset (usually the size of the code segment), and the offset is applied to all memory allocations
- the heap offset is set to the data segment offset plus the size of the data segment, and the heap pointer is set to the heap offset
- the command line arguments are pushed to the stack, along with the program system path, and the number of arguments
- the execution is started from the start address in the code segment

Static libraries are assumed to have already been linked in the object file: thus the program image will already contain any static library that is used. In the context of a virtual machine, dynamic libraries are not meant to be shared by different programs running at the same time (as it can happen in the context of an operating system) but to be shared by different programs during different executions. A program can be shipped as a basic binary, plus extensions as shared objects, and each user can decide which, if any, extensions to add to the program: this way we avoid bloating the program with too much functionality most of which ends up being useless for most users. Since which dynamic libraries should be loaded is known only at runtime, they need to be required while launching the program. Now, dynamic libraries contain both static data and code, and thus they need to be split into a code segment, and a data segment. The data segments need to be appended to the program data segment, and the code segments need to be appended to the program code segment, and the offsets need to be updated accordingly. To allow the loader to perform this, all needed dynamic libraries should be explicitly required as command line arguments while launching the program.

Procedure for compiling a program:
- all static objects are identified in the code, and the total size of the data segment is calculated
- all static objects are mapped to addresses within the data segment
- all non-static objects are mapped to addresses greater than the size of the data segment
- ...


## Components

### VM

Responsible of providing command line I/O, and to launch the execution of the other components. A typical execution of a program on the virtual machine could look like:
```
$ vm --vm.mem=16K --vm.lib=a.vmlib --vm.lib=b.vmlib myprogram first-arg second-arg --flag --param=value
```

Here `--vm.mem` and `--vm.lib` are virtual machine specific parameters, `myprogram` is the name of the program to be run, and `first-arg`, `second-arg`, `--flag` and `--param` are program specific parameters. All virtual machine specific parameters start with `--vm.`, and the name of the program is the first positional parameter.

The VM component will thus first create the loader, the memory and the interpreter. The memory will be created using the virtual machine memory parameter.

Then, the loader will be executed, passing as input the list of dynamic libraries, the name of the program, and the program arguments.

At this point the interpreter will be launched, having all registers already been set by the loader.

### Loader

Responsible of loading the program image from the given object file, along with all the required dynamic libraries.

The code segments of the program image, and of the dynamic libraries, are loaded contiguously into the program code segment, starting from the code segment offset (0). The data segment offset is calculated as the size of the final program code segment. The data segments of the program image, and of the dynamic libraries, are loaded contiguously into the program data segment, starting from the data segment offset.

Address references in both the code segment and data segment are updated applying the proper offsets.

Some command line arguments are related to the virtual machine itself, like which dynamic libraries to load, while other arguments are to be consumed by the program that is being run. The values of the command line arguments specific to the program are added to the data segment, after which their addresses are also added contiguously to the data segment. The number of arguments is pushed to the stack, as the address where the address of the first command line argument is located: these will become the `argc` and `argv` arguments to the main procedure, in case a high level language defines it. The heap offset is calculated as the sum of the data segment offset, and the data segment size.

### Registers

...

### Memory

...

### Interpreter

...

### System

...


## Todo

The virtual machine should just exit with the exit status of the program. This means that when the execution loop of the interpreter ends, a certain register will contain a value that should be interpreted as the exit status of the program. The virtual machine itself should then terminate with that same exit status.

Now, the virtual machine doesn't really make use of the registers, because they're used only by the loader and by the interpreter, so the exit status might just be returned by the execution loop as return value, and the virtual machine will just use it. In a more advanced scenario, the execution loop might need to return additional information to the virtual machine, for example if there were some error not generated by the program: these might be handled with exceptions though.


exec
    readInstruction
    getOpcode
    getFirstOperand
    getSecondOperand
    setRegister
    getRegister
    memory

    instruction readInstruction 0 memory
    opcode = getOpcode instruction
    if opcode === Opcode.mov
        register = getFirstOperand instruction
        value = getSecondOperand instruction
        setRegister register value
    if opcode === Opcode.syscall
        exitStatus = getRegister Register.ax
        return exitStatus

exec readInstruction execInstruction registers memory
    firstInstructionOffset = 0
    firstInstruction = readInstruction firstInstructionOffset memory
    execInstruction firstInstruction registers memory

    secondInstructionOffset = 4
    secondInstruction = readInstruction secondInstructionOffset memory
    statusCode = execInstruction secondInstruction registers memory

    return statusCode

execInstruction instruction register memory
    execFunction = 'exec' + instruction.constructor.name.ucfirst()
    return (require execFunction) registers memory

execMov setRegister registers


exec code
    applyToInstructions code instruction =>
        result = exec_instruction instruction
        if is_exit result
            return get_exit_status result

applyToInstructions code visit offset = 0 instructionSize = 4
    // code size memoization
    size = getSize code
    if offset > size - instructionSize
        return
    instruction = readInstruction code offset
    result = visit instruction

    if result !== undefined
        return result

    visitCode code visit offset + instructionSize


image
    registers
    code
    data
    stack
    heap
    

interface for instructions:
get_reg image EAX
set_reg image EAX value
...
get_instructions image
get_data ...
set_data ...
push_stack ...
pop_stack ...
...
sys_exit

interface for vm:
should_exit
get_exit_status

interpreter
    run image: image
        exec get_instructions image image
    exec instructions image
        if should_exit image
            return image
        image = exec_instruction instructions[0] image
        exec instructions[1...] image

file name -> read_binary_file -> binary string
binary string -> map_to_buffer -> byte buffer
byte buffer -> parse_image -> image
// calls second f until first f is not false
image -> run_image (image -> bool) (image -> image) -> exit status

file > read_binary_file | map_to_buffer | parse_image |
 run_image (!should_exit) (...)

run_image: image -> cond -> f -> int
    cond == false: get_exit_status image
    cond == true: run_image f(image)

...: image -> image
    image > fetch_instruction | increment_addr | exec_current

fetch_instruction: image =>
    get_ip image | get_instruction image | load_instruction image

increment_addr: image -> image
    image > write_special_register('ip')
                (read_special_register('ip') + 4)

exec_current: image -> image
    image > exec_instruction(read_special_register('ir'))




main load_image run
    run(load_image(process.argv.slice(2)[0]))



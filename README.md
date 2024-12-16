# Sample repo for dd-trace problems with bun

This repo shows problems with dd-trace and bun using `fetch`, trying to access a server that is not being listened on produces

```
[07:12:33.795] ERROR (10977): error during upstream request {}
    err: {
      "type": "TypeError",
      "message": "|this| is not an object",
      "stack":
          TypeError: |this| is not an object
              at reject (native:1:11)
              at processTicksAndRejections (native:7:39)
    }
```

## Getting Started

1. Install dependencies
```bash
bun install
```
2. Run the app
```bash
bun dev
```
3. send a request to http://localhost:3000/
4. see the error in the console

Note that the problem starts happening as soon as you add 
`dd-trace`.
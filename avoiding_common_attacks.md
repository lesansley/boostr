# Security
- Restricting access - Modifiers are used to restrict function access so that only specific addresses are permitted to execute functions
- A withdraw pattern is adopted to prevent re-entrancy and denial of service attacks
- An emergency circuit breaker has been included that prevents new Boostrs being created or contributions to exisiting Boostrs being made.
- Boostr contract uses `.transfer` instead of `.send`

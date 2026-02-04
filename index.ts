import { Router } from 'express';
import express from "express";
import fs from 'fs';
import path from 'path';
import { read } from '@changesets/read';
import { readConfig } from '@changesets/config';

const app = express()

// --- 30+ complex, buggy, and long random APIs for debugging practice ---
// Some APIs have intentional errors, undefined variables, and logic bugs

app.get("/user/:id", (req, res) => {
    // undefined variable 'user'
    res.json(user);
});

app.post("/sum", (req, res) => {
    // missing body parser, will fail
    const { a, b } = req.body;
    res.send({ sum: a + b });
});

app.get("/random-error", (req, res) => {
    // throws error randomly
    if (Math.random() > 0.5) {
        throw new Error("Random error occurred");
    }
    res.send("No error");
});

app.get("/timeout", async (req, res) => {
    // never responds
    while (true) {}
});

app.get("/divide", (req, res) => {
    // division by zero
    const result = 10 / 0;
    res.send({ result });
});

app.get("/undefined-var", (req, res) => {
    // undefined variable
    res.send(foo.bar);
});

app.get("/deep-object", (req, res) => {
    // deeply nested object, possible undefined
    const obj = { a: { b: { c: { d: 5 } } } };
    res.send({ value: obj.a.b.c.d.e });
});

app.get("/array-out-of-bounds", (req, res) => {
    const arr = [1, 2, 3];
    res.send({ value: arr[10].toString() });
});

app.get("/promise-reject", async (req, res) => {
    // unhandled promise rejection
    await Promise.reject("Promise failed");
    res.send("done");
});

app.get("/syntax-error", (req, res) => {
    // intentional syntax error (uncomment to test)
    // eval('var a = ;');
    res.send("syntax error test");
});

app.get("/null-access", (req, res) => {
    let x = null;
    res.send(x.y);
});

app.get("/infinite-loop", (req, res) => {
    while (true) {}
    res.send("done");
});

app.get("/memory-leak", (req, res) => {
    let arr = [];
    for (let i = 0; i < 1e7; i++) {
        arr.push(i);
    }
    res.send("leak");
});

app.get("/throw-string", (req, res) => {
    throw "This is a string, not an Error object";
});

app.get("/async-error", async (req, res) => {
    setTimeout(() => {
        throw new Error("Async error");
    }, 100);
    res.send("scheduled error");
});

app.get("/bad-json", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('{ bad json }');
});

app.get("/large-response", (req, res) => {
    let str = 'x'.repeat(1e7);
    res.send(str);
});

app.get("/slow", async (req, res) => {
    await new Promise(r => setTimeout(r, 10000));
    res.send("slow response");
});

app.get("/env", (req, res) => {
    res.send(process.env.SECRET_KEY);
});

app.get("/crash", (req, res) => {
    process.exit(1);
});

app.get("/type-error", (req, res) => {
    let n: any = 5;
    n();
    res.send("done");
});

app.get("/parse-int", (req, res) => {
    res.send({ value: parseInt("notanumber") });
});

app.get("/date", (req, res) => {
    res.send({ now: new Date("invalid-date").toISOString() });
});

app.get("/stack-overflow", (req, res) => {
    function recurse() { return recurse(); }
    recurse();
    res.send("done");
});

app.get("/missing-param", (req, res) => {
    // expects 'id' param
    res.send({ id: req.query.id.length });
});

app.get("/bad-type", (req, res) => {
    let arr: any = 123;
    arr.push(1);
    res.send("done");
});

app.get("/object-keys", (req, res) => {
    let obj = undefined;
    res.send(Object.keys(obj));
});

app.get("/json-parse", (req, res) => {
    JSON.parse("not json");
    res.send("done");
});

app.get("/double-send", (req, res) => {
    res.send("first");
    res.send("second");
});

app.get("/header-after-send", (req, res) => {
    res.send("done");
    res.setHeader('X-Test', 'value');
});

app.get("/forbidden", (req, res) => {
    res.status(403).send("Forbidden");
});

app.get("/random-delay", async (req, res) => {
    let delay = Math.random() * 5000;
    await new Promise(r => setTimeout(r, delay));
    res.send({ delay });
});

app.get("/echo", (req, res) => {
    res.send(req.body.message);
});

app.get("/math-error", (req, res) => {
    let x = Math.sqrt(-1);
    res.send({ x });
});

app.get("/unhandled-rejection", (req, res) => {
    Promise.reject("unhandled");
    res.send("done");
});

app.get("/circular-json", (req, res) => {
    let a: any = {};
    a.b = a;
    res.json(a);
});

// --- End of random buggy APIs ---

// --- Utility Functions ---

// Function to read .gitignore file
function getignore(): string[] {
    try {
        const gitignorePath = path.join(process.cwd(), '.gitignore');
        if (fs.existsSync(gitignorePath)) {
            const content = fs.readFileSync(gitignorePath, 'utf-8');
            return content.split('\n')
                .filter(line => line.trim() !== '' && !line.startsWith('#'))
                .map(line => line.trim());
        }
        return [];
    } catch (error) {
        console.error('Error reading .gitignore:', error);
        return [];
    }
}

// Function to handle changesets
async function changeset(action: 'read' | 'init' | 'add' = 'read', data?: any) {
    try {
        const cwd = process.cwd();
        
        switch (action) {
            case 'read':
                const changesets = await read(cwd);
                return {
                    success: true,
                    changesets: changesets.map((cs: any) => ({
                        summary: cs.summary,
                        releases: cs.releases,
                        id: cs.id
                    }))
                };
            
            case 'init':
                // Initialize changeset config
                const config = await readConfig(cwd);
                return {
                    success: true,
                    config: config,
                    message: 'Changeset config read successfully'
                };
            
            case 'add':
                // This would normally require interactive input
                return {
                    success: false,
                    message: 'Use "changeset add" command line to add changesets interactively'
                };
            
            default:
                return {
                    success: false,
                    message: 'Invalid action. Use "read", "init", or "add"'
                };
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}

// --- API Endpoints for new functions ---

app.get("/getignore", (req, res) => {
    const ignorePatterns = getignore();
    res.json({
        success: true,
        patterns: ignorePatterns,
        count: ignorePatterns.length
    });
});

app.get("/changeset/:action", async (req, res) => {
    const action = req.params.action as 'read' | 'init' | 'add';
    const result = await changeset(action);
    res.json(result);
});

app.post("/changeset/:action", async (req, res) => {
    const action = req.params.action as 'read' | 'init' | 'add';
    const data = req.body;
    const result = await changeset(action, data);
    res.json(result);
});

// --- End of Utility Functions ---

app.listen(4000, async () => {

    console.log("server is runing")
})

app.get("/", async (req, res) => {
    res.json("hshin");
});
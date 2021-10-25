import { readFileSync } from "fs";
import safe from "safe-regex";
import { resolve } from "path";
import browsers from "./browser-test.json";
import cpus from "./cpu-test.json";
import devices from "./device-test.json";
import engines from "./engine-test.json";
import os from "./os-test.json";
import { parse } from "./UserAgentParser";
import { parse as babelParser } from "@babel/parser";
import traverse from "@babel/traverse";

const methods = [
  {
    title: "getBrowser",
    label: "browser",
    list: browsers,
    properties: ["name", "major", "version"],
  },
  {
    title: "getCPU",
    label: "cpu",
    list: cpus,
    properties: ["architecture"],
  },
  {
    title: "getDevice",
    label: "device",
    list: devices,
    properties: ["model", "type", "vendor"],
  },
  {
    title: "getEngine",
    label: "engine",
    list: engines,
    properties: ["name", "version"],
  },
  {
    title: "getOS",
    label: "os",
    list: os,
    properties: ["name", "version"],
  },
];

for (const i in methods) {
  describe(methods[i]["title"], () => {
    for (const j in methods[i]["list"]) {
      if (!!methods[i]["list"][j].ua) {
        describe("[" + methods[i]["list"][j].desc + "]", () => {
          describe('"' + methods[i]["list"][j].ua + '"', () => {
            const expectResult = methods[i]["list"][j].expect;
            // @ts-expect-error: Due to complexity
            const result = parse(methods[i]["list"][j].ua)[methods[i]["label"]];

            methods[i]["properties"].forEach(function (m) {
              it(
                "should return " +
                  methods[i]["label"] +
                  " " +
                  m +
                  ": " +
                  // @ts-expect-error: Due to complexity
                  expectResult[m],
                function () {
                  expect(result[m]).toEqual(
                    // @ts-expect-error: Due to complexity
                    expectResult[m] != "undefined" ? expectResult[m] : undefined
                  );
                }
              );
            });
          });
        });
      }
    }
  });
}

describe("Returns", function () {
  it("getResult() should returns JSON", () => {
    expect(parse("")).toEqual({
      browser: { name: undefined, version: undefined, major: undefined },
      cpu: { architecture: undefined },
      device: { vendor: undefined, model: undefined, type: undefined },
      engine: { name: undefined, version: undefined },
      os: { name: undefined, version: undefined },
    });
  });
});

describe("Testing regexes", function () {
  const regexes: string[] = [];
  const ast = babelParser(
    readFileSync(resolve(__dirname, "UserAgentParser.ts"), "utf8").toString(),
    { sourceType: "module", plugins: ["typescript"] }
  );
  traverse(ast, {
    RegExpLiteral: (path) => {
      regexes.push(path.node.pattern);
    },
  });

  regexes.forEach(function (regex) {
    it("Test against `safe-regex` : " + regex, function () {
      expect(safe(regex)).toEqual(true);
    });
  });
});

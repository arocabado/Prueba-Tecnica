import { render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import Logo from "../components/logo";
import { HashRouter } from "react-router-dom";

describe("navbar", () => {
  beforeEach(() => {
    render(
      <HashRouter>
        <Logo title="Gatos" />
      </HashRouter>
    );
  });
  test("Deberia existir el icono", () => {
    const title = screen.getByRole("Title");
    expect(title).toBeDefined();
    const ptitle = screen.getByRole("pTitle");
    console.log(ptitle);
    expect(ptitle.textContent).toEqual("Gatos");
  });
});

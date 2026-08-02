# Pipeline Testing Scenarios

Here are multiple detailed pipeline scenarios you can build in the UI to test all the functionalities we've implemented, from basic DAG validation to complex routing and infinite loop detection.

---

## Scenario 1: The Basic Valid Pipeline
**Goal:** Verify that a simple, linear pipeline registers as a valid Directed Acyclic Graph (DAG) and correctly counts nodes and edges.

**Steps to Build:**
1. Drag an **Input** node onto the canvas.
2. Drag an **LLM** node onto the canvas.
3. Drag an **Output** node onto the canvas.
4. Connect: `Input (value)` → `LLM (system)`.
5. Connect: `LLM (response)` → `Output (value)`.
6. Click **Review**.

**Expected Result:**
- **Nodes:** 3
- **Edges:** 2
- **Valid DAG:** ✓ Yes
- **Submit:** Button should become clickable.

---

## Scenario 2: The Infinite Loop (Cycle Detection)
**Goal:** Verify that the backend correctly identifies a cycle (infinite loop), rejects the DAG, and tells you exactly which nodes caused it.

**Steps to Build:**
1. Drag an **Input** node (Name it "Start").
2. Drag a **Transform** node.
3. Drag an **API Request** node.
4. Connect: `Input` → `Transform (input)`.
5. Connect: `Transform (output)` → `API Request (trigger)`.
6. **Create the Loop:** Connect: `API Request (response)` back to `Transform (input)`.
7. Click **Review**.

**Expected Result:**
- **Valid DAG:** ✗ No
- **Error Details:** You should see a red text path explicitly showing the cycle, for example: `transformNode-1 -> apiNode-1 -> transformNode-1`
- **Submit:** Button remains disabled.

---

## Scenario 3: Complex Conditional Branching
**Goal:** Test the new `Condition` node and verify that a complex tree structure is still a valid DAG as long as paths don't loop backwards.

**Steps to Build:**
1. Drag a **Database** node (simulating fetching user data).
2. Drag a **Condition** node (Set condition to `> 18`).
3. Drag **two Code** nodes (Name one "Adult Logic", the other "Minor Logic").
4. Drag an **Output** node.
5. Connect: `Database (Results)` → `Condition (Input)`.
6. Connect: `Condition (True)` → `Code (Adult Logic - Input)`.
7. Connect: `Condition (False)` → `Code (Minor Logic - Input)`.
8. Connect *both* `Code (Output)` handles to the `Output (value)` node.
9. Click **Review**.

**Expected Result:**
- **Nodes:** 5
- **Edges:** 5
- **Valid DAG:** ✓ Yes

---

## Scenario 4: The Dynamic Text Variable Spawner
**Goal:** Test the custom variable detection in the Text node.

**Steps to Build:**
1. Drag a **Text** node onto the canvas.
2. In the text area, type: `Hello {{ firstName }}, your order number is {{ orderId }}.`
3. Notice that two new handles automatically appear on the left side: `firstName` and `orderId`.
4. Drag two **Input** nodes onto the canvas (Rename them to "First Name Input" and "Order ID Input").
5. Connect them to their respective new handles on the Text node.
6. Click **Review**.

**Expected Result:**
- **Nodes:** 3
- **Edges:** 2
- **Valid DAG:** ✓ Yes

---

## Scenario 5: The Disconnected Graph
**Goal:** Verify that multiple floating, unconnected nodes are still processed and counted properly without throwing errors.

**Steps to Build:**
1. Delete everything on the canvas.
2. Drag in **5 different nodes** at random, but **do not connect any of them**.
3. Click **Review**.

**Expected Result:**
- **Nodes:** 5
- **Edges:** 0
- **Valid DAG:** ✓ Yes (A graph with no edges has no cycles, so it is a valid DAG!)

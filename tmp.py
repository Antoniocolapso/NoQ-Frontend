from collections import deque

def reachTheEnd(rows, grid, maxTime):
    if not grid or not grid[0]:
        return "No"
    
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)] 
    
    queue = deque([(0, 0, 0)])
    visited = set([(0, 0)]) 
    
    while queue:
        row, col, time = queue.popleft()
        
        if row == rows - 1 and col == len(grid[0]) - 1:
            return "Yes" if time <= maxTime else "No"
        
        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc
            
            if 0 <= new_row < rows and 0 <= new_col < len(grid[0]) and (new_row, new_col) not in visited:
                if grid[new_row][new_col] == '.':
                    queue.append((new_row, new_col, time + 1))
                    visited.add((new_row, new_col))
    
    return "No"

rows=int(input())
grid=[]
for _ in range (rows):
    grid.append(input())

maxTime=int(input())


print(reachTheEnd(rows,grid,maxTime))



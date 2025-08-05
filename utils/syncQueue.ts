type Task = () => Promise<void>;

class SyncQueue {
    private queue: Task[] = [];
    private running = false;

    add(task: Task) {
        this.queue.push(task);
        this.runNext();
    }

    private async runNext() {
        if (this.running || this.queue.length === 0) return;
        this.running = true;
        while (this.queue.length > 0) {
            const task = this.queue.shift();
            if (task) {
                try {
                    await task();
                } catch (err) {
                    // Handle error as needed
                    console.error('SyncQueue task error:', err);
                }
            }
        }
        this.running = false;
    }
}

export default SyncQueue;
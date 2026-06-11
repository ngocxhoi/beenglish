export const useDashboardStore = defineStore('dashboard-store', () => {
  const data = ref<DataDashboard | null>(null)

  async function initial(res: DataDashboard) {
    data.value = res
  }

  return {
    data,
    initial
  }
})
